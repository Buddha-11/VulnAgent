import os
import json
import subprocess
from pathlib import Path
from langchain_core.tools import tool
from tools.ga_fuzzer import run_fuzzer as internal_run_fuzzer

DB_NAME = "benchmark-db"
SARIF_FILE = "agent_results.sarif"

@tool
def rebuild_codeql_database() -> str:
    """Builds or rebuilds the CodeQL database for the Java project. Must be run before analysis."""
    if os.path.exists(DB_NAME):
        subprocess.run(["rm", "-rf", DB_NAME])
    
    result = subprocess.run([
        "codeql", "database", "create", DB_NAME,
        "--language=java",
        "--source-root=.",
        "--command=mvn -DskipTests -Dspotless.check.skip=true -Dspotless.apply.skip=true clean compile"
    ], capture_output=True, text=True)
    
    if result.returncode != 0:
        return f"CodeQL database creation failed:\n{result.stderr}"
    return "CodeQL database rebuilt successfully."

@tool
def validate_compilation() -> str:
    """Runs a Maven compile check to verify if the Java code compiles cleanly without errors."""
    result = subprocess.run(
        ["mvn", "-DskipTests",
         "-Dspotless.check.skip=true",
         "-Dspotless.apply.skip=true",
         "clean", "compile"],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        return f"Compilation FAILED:\n{result.stdout[-1000:]}"
    return "Compilation OK."

@tool
def run_codeql_analysis(changed_files: str = "") -> str:
    """Runs CodeQL analysis and returns a JSON summary of vulnerabilities found.
    Args:
        changed_files: comma-separated list of files to filter alerts for (optional).
    """
    if not os.path.exists(DB_NAME):
        return "Error: CodeQL database not found. Run rebuild_codeql_database first."
        
    result = subprocess.run([
        "codeql", "database", "analyze", DB_NAME,
        "codeql/java-queries",
        "--format=sarifv2.1.0",
        f"--output={SARIF_FILE}"
    ], capture_output=True, text=True)
    
    if result.returncode != 0:
        return f"CodeQL analysis failed:\n{result.stderr}"
        
    # Parse SARIF
    if not os.path.exists(SARIF_FILE):
        return "Error: SARIF file not generated."
        
    with open(SARIF_FILE) as f:
        sarif = json.load(f)

    alerts = []
    results = sarif.get("runs", [{}])[0].get("results", [])
    
    filter_files = [f.strip() for f in changed_files.split(",") if f.strip()]

    for r in results:
        locations = r.get("locations", [])
        if not locations:
            continue
        uri = locations[0]["physicalLocation"]["artifactLocation"]["uri"]
        
        # If filtering by changed files, skip if not in list
        if filter_files:
            match = False
            for file in filter_files:
                if uri.endswith(Path(file).name):
                    match = True
                    break
            if not match:
                continue
                
        line = locations[0]["physicalLocation"]["region"]["startLine"]
        rule = r["ruleId"]
        alerts.append({"file": uri, "line": line, "ruleId": rule})

    if not alerts:
        return "Code is clean! No vulnerabilities found."
        
    return json.dumps(alerts, indent=2)

@tool
def run_fuzzer(target_url: str, vuln_type: str, param_name: str) -> str:
    """Runs the Genetic Algorithm Fuzzer against a specific endpoint.
    Args:
        target_url: The full URL to attack (e.g. https://localhost:8443/benchmark/xss-00/BenchmarkTest00001)
        vuln_type: The type of vulnerability (e.g., 'xss', 'sqli', 'path-traversal')
        param_name: The vulnerable parameter to fuzz (e.g., 'BenchmarkTest00001')
    Returns:
        JSON string containing the fuzzer results (whether it was vulnerable, payload used, etc.)
    """
    return internal_run_fuzzer(target_url, vuln_type, param_name)

@tool
def apply_patch(file_path: str, patch_text: str) -> str:
    """Applies a full file patch. Overwrites the file at file_path with patch_text."""
    try:
        with open(file_path, "w") as f:
            f.write(patch_text)
            if not patch_text.endswith("\n"):
                f.write("\n")
        return f"Patch successfully applied to {file_path}."
    except Exception as e:
        return f"Error applying patch: {e}"
