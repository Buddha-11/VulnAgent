import { ShieldIcon as Shield, SearchIcon as Search, BrainIcon as Brain, WrenchIcon as Wrench, GitCommitIcon as GitCommit, RefreshCwIcon as RefreshCw } from './icons.jsx';
import { FadeSection } from './utils.jsx';

const steps = [
  {
    number: '01',
    icon: GitCommit,
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'Webhook Trigger',
    subtitle: 'Automated Pipeline Entry',
    description: 'A developer pushes code to GitHub. A webhook instantly notifies the local Jenkins server (exposed via ngrok), triggering the full autonomous pipeline without any manual intervention.',
    details: ['git push → GitHub Webhook', 'Jenkins pipeline activation', 'ngrok tunnel (real-time CI)'],
  },
  {
    number: '02',
    icon: Search,
    color: '#f59e0b',
    colorDim: 'rgba(245,158,11,0.12)',
    title: 'SAST + DAST Scanning',
    subtitle: 'Dual-Layer Threat Detection',
    description: 'CodeQL builds a full AST of the codebase and executes deep data-flow queries to detect Java vulnerabilities. Simultaneously, OWASP ZAP is run against a live Tomcat deployment to catch runtime flaws invisible to static analysis.',
    details: [
      'CodeQL: SQL Injection, XSS, Path Traversal',
      'OWASP ZAP: Runtime HTTP attacks',
      'Output: SARIF + ZAP JSON reports',
    ],
    code: `# CodeQL database creation
codeql database create benchmark-db \\
  --language=java \\
  --command="mvn -DskipTests clean compile"

# Run Java security queries  
codeql database analyze benchmark-db \\
  java-queries:codeql-suites/java-security.qls \\
  --format=sarif-latest \\
  --output=agent_results.sarif`,
  },
  {
    number: '03',
    icon: Brain,
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    title: 'ML Triage',
    subtitle: '13-Dimensional Feature Engineering',
    description: 'Raw SARIF alerts are transformed into rich feature vectors. A Random Forest classifier trained on the OWASP Benchmark filters out false positives, ensuring only real threats reach the LLM.',
    details: [
      '13-dim CWE type distribution vector',
      'same_type_count + weighted_alert_count (SELF_WEIGHT=3.0)',
      'Threshold: ≥ 0.414 RF / ≥ 0.364 GBM',
      '91% false-positive suppression',
    ],
  },
  {
    number: '04',
    icon: Wrench,
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    title: 'LLM Self-Healing Loop',
    subtitle: 'Llama-3.3-70B via Groq API',
    description: 'For each confirmed vulnerability, the agent enters a 3-iteration self-healing loop. Starting with a ±5-line snippet patch, escalating to full-file context if compilation fails. Every patch is validated by Maven before acceptance.',
    details: [
      'Iter 1-2: Snippet-mode patch (±5 lines)',
      'Compilation check: mvn clean compile',
      'Iter 3: Full-file escalation mode',
      'Auto-revert on compilation failure',
    ],
    code: `# Snippet-level patch generation
prompt = f"""Fix the vulnerability at line {line}.
Return ONLY valid Java code, no markdown.

Context:
{snippet}"""

response = groq.chat(
  model="llama-3.3-70b-versatile",
  messages=[{"role": "user", "content": prompt}]
)`,
  },
  {
    number: '05',
    icon: RefreshCw,
    color: '#f59e0b',
    colorDim: 'rgba(245,158,11,0.12)',
    title: 'Re-Scan Verification',
    subtitle: 'Zero-Trust Validation',
    description: 'After patching, CodeQL re-analyzes the modified codebase end-to-end. Only patches that eliminate the vulnerability without introducing new flaws are accepted — guaranteeing genuine remediation.',
    details: [
      'Full CodeQL re-scan on patched code',
      'ML re-triage to check for new issues',
      'Zero false acceptance policy',
    ],
  },
  {
    number: '06',
    icon: GitCommit,
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'Auto-Commit & Report',
    subtitle: 'Closed-Loop Automation',
    description: 'Verified patches are automatically committed to GitHub via PAT authentication. Full SARIF, DAST, and JSON reports are archived. The cycle completes without any human involvement.',
    details: [
      'Automated git commit + push via PAT',
      'Archived reports: SARIF, ZAP JSON',
      'Jenkins build status: SUCCESS / UNSTABLE',
    ],
  },
];

export default function Workflow() {
  return (
    <section id="workflow" style={{ background: 'var(--bg-800)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">
            ⚡ Pipeline Stages
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            How the{' '}
            <span className="gradient-text-cyan">Agentic Pipeline</span>{' '}
            Works
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            A self-healing security loop triggered by every code push — no human intervention required.
          </p>
        </FadeSection>

        <div style={{ position: 'relative' }}>
          {/* Vertical connector line */}
          <div style={{
            position: 'absolute',
            left: '28px',
            top: '24px',
            bottom: '24px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--cyan), var(--purple), var(--green), var(--amber))',
            opacity: 0.2,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeSection key={i}>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                    {/* Step indicator */}
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: 58,
                        height: 58,
                        borderRadius: '50%',
                        background: step.colorDim,
                        border: `2px solid ${step.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        flexShrink: 0,
                      }}>
                        <Icon size={24} color={step.color} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="card" style={{ flex: 1, marginBottom: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: step.color,
                          background: step.colorDim,
                          border: `1px solid ${step.color}30`,
                          padding: '0.2rem 0.6rem',
                          borderRadius: 6,
                          fontWeight: 600,
                        }}>
                          STEP {step.number}
                        </span>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                          {step.title}
                        </h3>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                          {step.subtitle}
                        </span>
                      </div>

                      <p style={{ color: '#94a3b8', lineHeight: 1.8, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                        {step.description}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: step.code ? '1fr 1fr' : '1fr', gap: '1rem' }}>
                        {/* Key points */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {step.details.map((d, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                              <span style={{ color: step.color, marginTop: '2px', flexShrink: 0 }}>▹</span>
                              {d}
                            </li>
                          ))}
                        </ul>
                        {/* Code snippet */}
                        {step.code && (
                          <div className="code-block" style={{ fontSize: '0.75rem', margin: 0 }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                              {step.code}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
