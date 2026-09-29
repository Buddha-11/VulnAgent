import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.messages import SystemMessage, HumanMessage

# Ensure GROQ_API_KEY is in environment
llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.2)

def get_developer_prompt(vuln_info: dict, file_content: str, feedback: str = "") -> str:
    """Creates the prompt for the Developer Agent to fix a vulnerability."""
    
    rule_hint = ""
    rule_id = vuln_info.get("ruleId", "")
    
    # Using the hints from the original agent_pipeline.py
    if "xss" in rule_id:
        rule_hint = (
            "XSS FIX PATTERN (CodeQL java/xss rule):\n"
            "  WRONG: response.getWriter().println(\"<p>\" + ESAPI.encoder().encodeForHTML(param) + \"</p>\");\n"
            "  CORRECT:\n"
            "    String safe = org.owasp.esapi.ESAPI.encoder().encodeForHTML(param);\n"
            "    response.getWriter().println(safe.toCharArray());\n"
            "Always assign the encoded result to a NEW variable before writing to the response."
        )
    elif "sql-injection" in rule_id:
        rule_hint = (
            "SQL INJECTION FIX PATTERN:\n"
            "  Replace Statement.execute(sql) with a PreparedStatement.\n"
            "  Never concatenate user input into the SQL string."
        )
    elif "path-injection" in rule_id:
        rule_hint = (
            "PATH TRAVERSAL FIX PATTERN:\n"
            "  Canonicalize the path and verify it stays inside the base directory.\n"
        )
        
    feedback_section = ""
    if feedback:
        feedback_section = f"\n[CRITICAL FEEDBACK FROM VERIFIER]:\nYour previous patch failed. Do not repeat the same mistake. Error details:\n{feedback}\n"
        
    system_msg = (
        "You are a secure Java code expert working on the OWASP Benchmark project.\n"
        "IMPORTANT CONSTRAINTS:\n"
        "  1. Use ONLY libraries already on the classpath (ESAPI, standard Java).\n"
        "  2. Do NOT import or reference any library NOT already in the file.\n"
        "  3. Do NOT add new Maven dependencies.\n"
        "  4. Return ONLY valid Java code — no markdown, no fences, no commentary.\n"
        f"\nFIX GUIDANCE FOR THIS RULE:\n{rule_hint}\n"
    )
    
    user_msg = (
        f"The following Java file has a {rule_id} vulnerability on approximately line {vuln_info.get('line', 'unknown')}.\n"
        "Fix ALL vulnerabilities and return ONLY the complete corrected Java file.\n"
        "Do NOT include markdown, code fences, or any explanation.\n"
        f"{feedback_section}\n"
        f"--- Source Code ---\n{file_content}"
    )
    
    return [SystemMessage(content=system_msg), HumanMessage(content=user_msg)]

def call_developer_agent(vuln_info: dict, file_content: str, feedback: str = "") -> str:
    messages = get_developer_prompt(vuln_info, file_content, feedback)
    response = llm.invoke(messages)
    
    # Strip markdown if present
    content = response.content.strip()
    if content.startswith("```"):
        lines = content.split("\n")
        content = "\n".join(lines[1:-1]) if lines[-1].startswith("```") else "\n".join(lines[1:])
    return content.strip()
