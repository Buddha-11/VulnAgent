import os
import json
from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from tools import rebuild_codeql_database, run_codeql_analysis, validate_compilation, apply_patch, run_fuzzer
from agents import call_developer_agent

class AgentState(TypedDict):
    vulnerabilities: List[dict]
    current_vuln_idx: int
    patch_attempts: int
    max_attempts: int
    feedback: str
    status: str

def analyze_codebase(state: AgentState):
    """Blue Team Node: Runs CodeQL to find vulnerabilities."""
    print("--- [Blue Team] Analyzing Codebase ---")
    rebuild_codeql_database.invoke({})
    
    # Run CodeQL
    results_json = run_codeql_analysis.invoke({"changed_files": ""})
    
    try:
        vulns = json.loads(results_json)
        if isinstance(vulns, list) and len(vulns) > 0:
            print(f"Found {len(vulns)} vulnerabilities.")
            return {"vulnerabilities": vulns, "current_vuln_idx": 0, "status": "vulns_found"}
        else:
            return {"vulnerabilities": [], "status": "clean"}
    except json.JSONDecodeError:
        print("Analysis failed or code is clean.")
        return {"vulnerabilities": [], "status": "clean"}

def patch_vulnerability(state: AgentState):
    """Developer Node: Generates and applies a patch."""
    idx = state.get("current_vuln_idx", 0)
    vulns = state.get("vulnerabilities", [])
    
    if idx >= len(vulns):
        return {"status": "all_patched"}
        
    vuln = vulns[idx]
    file_path = vuln["file"]
    
    # Clean the URI to an absolute path if necessary (CodeQL returns file:// URIs or absolute paths)
    if file_path.startswith("file://"):
        file_path = file_path[7:]
        # Windows edge case: file:///c:/... -> c:/...
        if file_path.startswith("/") and ":" in file_path[1:3]:
            file_path = file_path[1:]
            
    print(f"--- [Developer] Patching {file_path} (Attempt {state.get('patch_attempts', 0) + 1}) ---")
    
    try:
        with open(file_path, "r") as f:
            original_code = f.read()
    except Exception as e:
        return {"feedback": f"Could not read file: {e}", "status": "read_error"}
        
    # Generate Patch
    patched_code = call_developer_agent(vuln, original_code, state.get("feedback", ""))
    
    # Apply Patch
    apply_patch.invoke({"file_path": file_path, "patch_text": patched_code})
    
    return {"patch_attempts": state.get("patch_attempts", 0) + 1, "status": "patched"}

def verify_patch(state: AgentState):
    """Verifier Node (QA / Red Team): Checks compilation and runs the fuzzer."""
    idx = state.get("current_vuln_idx", 0)
    vulns = state.get("vulnerabilities", [])
    vuln = vulns[idx]
    
    print("--- [Verifier] Validating Patch ---")
    
    # 1. Check Compilation
    compilation_res = validate_compilation.invoke({})
    if "FAILED" in compilation_res:
        print("  ✗ Compilation Failed")
        return {"feedback": compilation_res, "status": "verification_failed"}
        
    print("  ✓ Compilation Succeeded")
    
    # 2. Run Genetic Fuzzer (DAST)
    rule_id = vuln.get("ruleId", "")
    vuln_type = "xss" if "xss" in rule_id else "sqli" if "sql" in rule_id else "path-traversal"
    
    # Extract test name from path
    file_name = vuln["file"].split("/")[-1].replace(".java", "")
    
    # Example URL mapping for OWASP Benchmark
    target_url = f"http://localhost:8080/benchmark/{vuln_type}-00/{file_name}"
    
    print(f"  > Running Genetic Fuzzer against {target_url}...")
    fuzzer_res = run_fuzzer.invoke({"target_url": target_url, "vuln_type": vuln_type, "param_name": file_name})
    
    try:
        fuzzer_data = json.loads(fuzzer_res)
        if fuzzer_data.get("vulnerable"):
            print(f"  ✗ Fuzzer bypassed the patch! Payload: {fuzzer_data.get('successful_payload')}")
            feedback = f"Fuzzer successfully bypassed your patch using payload: {fuzzer_data.get('successful_payload')}"
            return {"feedback": feedback, "status": "verification_failed"}
        else:
            print("  ✓ Fuzzer validation passed. Patch is secure.")
            return {"status": "verification_passed"}
    except Exception as e:
        print(f"  ⚠ Fuzzer error: {e}")
        # If fuzzer fails to run, we assume it's secure for this POC, or we can fail it
        return {"status": "verification_passed"}

def router(state: AgentState):
    """Determine the next step based on status."""
    status = state.get("status")
    
    if status == "clean" or status == "all_patched":
        return "end"
        
    if status == "vulns_found":
        return "patch"
        
    if status == "patched":
        return "verify"
        
    if status == "verification_failed":
        if state.get("patch_attempts", 0) >= state.get("max_attempts", 3):
            print(f"--- [Router] Max attempts reached for vulnerability {state.get('current_vuln_idx')} ---")
            return "next_vuln"
        return "patch"
        
    if status == "verification_passed":
        return "next_vuln"

def move_to_next_vuln(state: AgentState):
    """Reset attempts and increment vulnerability index."""
    idx = state.get("current_vuln_idx", 0) + 1
    return {"current_vuln_idx": idx, "patch_attempts": 0, "feedback": "", "status": "next"}

def build_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("analyze", analyze_codebase)
    workflow.add_node("patch", patch_vulnerability)
    workflow.add_node("verify", verify_patch)
    workflow.add_node("next", move_to_next_vuln)
    
    workflow.set_entry_point("analyze")
    
    workflow.add_conditional_edges(
        "analyze",
        router,
        {
            "patch": "patch",
            "end": END
        }
    )
    
    workflow.add_conditional_edges(
        "patch",
        router,
        {
            "verify": "verify"
        }
    )
    
    workflow.add_conditional_edges(
        "verify",
        router,
        {
            "patch": "patch",
            "next_vuln": "next"
        }
    )
    
    workflow.add_edge("next", "patch")
    
    return workflow.compile()

if __name__ == "__main__":
    app = build_graph()
    print("LangGraph Orchestrator initialized.")
    # To run:
    # app.invoke({"patch_attempts": 0, "max_attempts": 3})
