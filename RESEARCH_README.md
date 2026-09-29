# VulnAgent: True Agentic AI for Automated Vulnerability Repair

## 1. Project Overview & Research Objectives
The goal of this research project is to elevate the **VulnAgent** (specifically the `BenchmarkJava` module) from a traditional "pseudo-agentic" script—which relies on a rigid `for-loop` and single-prompt LLM interactions—into a **True Agentic AI Framework**. 

By merging the dynamic evaluation capabilities of the `GenePatch` directory (Genetic Fuzzing) with the static analysis of `BenchmarkJava` (CodeQL), we are building a stateful, reasoning-driven Multi-Agent System using **LangGraph**. This approach mirrors the decision-making processes of human security engineers, separating concerns into distinct "Red Team" (Exploitation), "Blue Team" (Analysis), and "Developer" (Remediation) nodes.

## 2. Architectural Deep Dive: The Neuro-Symbolic Workflow
Instead of a linear script that blindly applies patches and checks for compilation, the new architecture introduces a **Closed-Loop, Neuro-Symbolic Workflow** orchestrated by LangGraph. This architecture combines the "neural" reasoning of Large Language Models with the "symbolic" deterministic logic of static analyzers and evolutionary algorithms.

### Data Flow and State Machine (LangGraph)
The system operates as a finite state machine where the "state" contains the Abstract Syntax Tree (AST) vulnerability data, the target source code, patch attempts, and execution feedback.

1. **Blue Team (Analysis & ML Triage Node):** 
   - **Static Analysis:** Triggers the CodeQL engine to perform Static Application Security Testing (SAST) to extract structural data flows and memory operation patterns.
   - **Machine Learning Triage:** Passes the raw CodeQL alerts through our trained Random Forest Classifier (`rf_model.pkl`). The model extracts code-level features (e.g., alert density, presence of dangerous APIs vs. user input) to assign a confidence score to each vulnerability.
   - **Data Processing:** Only vulnerabilities that pass the ML confidence threshold (filtering out false positives) are converted into JSON context for the LLM. This step is critical for saving token costs and preventing the agent from hallucinating patches for secure code.
2. **Developer (Remediation Node):** 
   - **Action:** A highly constrained LLM agent (via Groq/LLaMA-3) receives the context.
   - **Constraints:** It is strictly prompted to use existing classpath libraries (e.g., OWASP ESAPI) without introducing new dependencies. It synthesizes a drop-in patch for the vulnerable code block.
3. **Red Team / QA (Verification Node):** 
   - **Action:** Compiles the patched Java application (Maven) and launches a dynamic attack using the **Evolutionary Genetic Fuzzer**.
4. **The Adversarial Feedback Loop (Routing):** 
   - If the fuzzer bypasses the Developer's patch, the fuzzer's exact attack payload (Proof-of-Concept) and stack trace are appended to the LangGraph state.
   - The state is routed *back* to the Developer node. The LLM is forced to read the fuzzer's bypassing payload and generate a new, more structurally sound patch, effectively learning from its mistakes at runtime.

## 3. Algorithmic Deep Dive: The Genetic Fuzzer
A cornerstone of this research is replacing static unit tests with **Dynamic Application Security Testing (DAST)** powered by a Genetic Algorithm (GA). Unlike standard fuzzers that randomly throw data at an endpoint, our GA *evolves* payloads to bypass the LLM's patches.

### How the Genetic Algorithm Works
The fuzzer models vulnerability exploitation as an evolutionary biology problem:

1. **Chromosomes (The Population):** 
   - Each "Chromosome" represents a specific attack payload (e.g., an XSS string like `<script>alert(1)</script>` or a SQLi string like `' OR 1=1 --`).
   - The initial population is seeded with a mix of standard dictionary payloads.
2. **Fitness Function (Evaluation):** 
   - The algorithm evaluates how "fit" a payload is based on the server's HTTP response. 
   - **High Fitness (100.0):** The payload successfully triggered the vulnerability (e.g., a SQL syntax error, an HTTP 500 code, or exact reflection of an XSS payload in the DOM).
   - **Medium Fitness (10.0 - 50.0):** The payload caused a time delay (Time-Based SQLi indicator) or partial reflection of special characters.
   - **Low Fitness:** The application safely sanitized the input (HTTP 200/400 without errors).
3. **Selection (Survival of the Fittest):** 
   - Using "Roulette Wheel" selection, payloads with higher fitness scores have a proportionally higher chance of being selected to breed the next generation. We also use "Elitism" to guarantee the top 2 payloads survive unchanged.
4. **Crossover (Breeding):** 
   - Two selected parent payloads are spliced together. For example, the first half of a SQL injection string is concatenated with the second half of another, creating a novel attack vector.
5. **Mutation:** 
   - To maintain genetic diversity and avoid local optima, a small percentage of characters are randomly mutated. This includes URL-encoding characters, swapping `'` for `"`, or appending random SQL operators (`/*`, `SLEEP(1)`).

By evolving these payloads over multiple generations, the Red Team node can discover highly obfuscated, zero-day style bypasses that defeat naive LLM patches (like simple `replace()` functions), forcing the Developer node to write mathematically secure code (like `PreparedStatement`).

## 4. Theoretical Foundations & References
This architecture is heavily inspired by recent breakthroughs in Automated Program Repair (APR) and Large Language Models (LLMs).

*   **Multi-Faceted Context Engineering:** Like the **AgenticRepair** framework, our Blue Team node focuses on providing structural context rather than just a bug report.
    *   *Reference:* [AgenticRepair: Context-Conditioned Vulnerability Repair](https://arxiv.org/abs/2607.29422) (2026)
*   **Autonomous Agent Workflows (ReAct):** Our state-machine orchestration is analogous to systems like **AutoCodeRover**, which navigate codebases autonomously rather than relying on human-curated snippets.
    *   *Reference:* [AutoCodeRover: Autonomous Program Improvement](https://arxiv.org/abs/2404.05427) (ISSTA 2024)
*   **Evolutionary Fuzzing as a Guide for Repair:** Traditional search-based APR methods (like GenProg) used genetic algorithms to mutate code. We invert this by using Genetic Algorithms to mutate *payloads* (fuzzing), acting as an adversarial judge for the LLM. This aligns with modern research on using fuzzers to refine LLM search spaces (e.g., Fix2Fit).
    *   *Reference:* [Fix2Fit: Fuzzing as a Guide for Repair](https://arxiv.org/abs/2301.00000) (Example placeholder for Fuzz-guided APR).
*   **Neuro-Symbolic Approaches:** Combining the creative generative power of LLMs (Neuro) with the logical rigor of CodeQL and Genetic Fuzzing (Symbolic/Algorithmic) to validate patches before human review.

## 5. Future Possibilities & Distinct Features
To make this project stand out in an academic defense, the following features represent the frontier of this research and are slated for future implementation:

1. **Self-Evolving Harnesses (Meta-Learning):** The Genetic Fuzzer currently evolves payloads based on hardcoded fitness functions. A future feature could allow the LLM to evolve the *Fuzzer itself*, writing custom fitness functions on the fly based on the specific CodeQL vulnerability detected.
2. **Spectrum-Based Fault Localization (SBFL):** Integrating standard test suites (like Pytest/JUnit) to create a heat-map of failing tests, providing the Developer agent with precise, line-level fault localization before it writes a patch.
3. **Adversarial Robustness Testing:** Evaluating the agent against "malicious issue descriptions" (similar to the SWEADV benchmark) to ensure the AI cannot be tricked into introducing backdoors while attempting to fix a legitimate vulnerability.
4. **Cross-Language Generalization:** While currently targeting Java (OWASP Benchmark), the LangGraph orchestration can be generalized. The Fuzzer is language-agnostic (HTTP-based), meaning simply swapping CodeQL for Bandit could allow the exact same agent workflow to repair Python applications.
