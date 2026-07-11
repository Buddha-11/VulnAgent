import { FadeSection } from './utils.jsx';

const techStacks = [
  {
    category: 'Security Analysis',
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    items: [
      { name: 'CodeQL', desc: 'Deep SAST via AST data-flow analysis. Tracks tainted inputs from HTTP endpoints to SQL queries.', badge: 'SAST' },
      { name: 'OWASP ZAP', desc: 'Dynamic Application Security Testing. Detects runtime vulnerabilities in deployed applications.', badge: 'DAST' },
      { name: 'OWASP Benchmark', desc: 'Ground-truth evaluation dataset with 2,766 labelled Java test cases across 8 vulnerability categories.', badge: 'Dataset' },
      { name: 'SARIF 2.1', desc: 'Static Analysis Results Interchange Format. Structured JSON output parsed for ML feature extraction.', badge: 'Format' },
    ],
  },
  {
    category: 'Machine Learning',
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    items: [
      { name: 'Random Forest', desc: 'Primary classifier. 13-dimensional vectorized CWE features + weighted signal boosting. Threshold: 0.414.', badge: 'Sklearn' },
      { name: 'Gradient Boosting', desc: 'Highest F1 (0.8887) and ROC-AUC (0.9106). Threshold tuned to 0.364 for maximum recall.', badge: 'GBM' },
      { name: 'SVM (RBF kernel)', desc: 'Baseline comparison model. Achieves 0.80 accuracy but lower recall for security-critical tasks.', badge: 'SVM' },
      { name: 'scikit-learn', desc: 'Feature engineering, cross-validation, threshold optimization and model persistence (pickle).', badge: 'Python' },
    ],
  },
  {
    category: 'LLM & AI',
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    items: [
      { name: 'Llama-3.3-70B', desc: 'Meta\'s 70-billion parameter model for code understanding and vulnerability remediation.', badge: 'LLM' },
      { name: 'Groq API', desc: 'Ultra-low latency inference for Llama models. Enables real-time patch generation in CI pipelines.', badge: 'Inference' },
      { name: 'Agentic Loop', desc: 'Perceive→Reason→Act→Validate loop with automatic escalation from snippet to full-file patching mode.', badge: 'Agent' },
      { name: 'Prompt Engineering', desc: 'Strict system prompts enforce raw Java output only — no markdown, no explanations — ensuring safe patch application.', badge: 'Design' },
    ],
  },
  {
    category: 'Infrastructure & CI/CD',
    color: 'var(--amber)',
    colorDim: 'var(--amber-dim)',
    items: [
      { name: 'Jenkins', desc: 'Declarative pipeline orchestration triggered via GitHub webhooks on every push event.', badge: 'CI/CD' },
      { name: 'ngrok', desc: 'Tunnels the local Jenkins instance to the internet for real-time webhook delivery.', badge: 'Network' },
      { name: 'Apache Tomcat', desc: 'Application server for DAST scanning. Health-check scripts ensure ready state before ZAP triggers.', badge: 'Server' },
      { name: 'Apache Maven', desc: 'Build tool used for compilation, testing, and CodeQL database creation via mvn clean compile.', badge: 'Build' },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" style={{ background: 'var(--bg-900)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ marginBottom: '4rem' }}>
          <div className="section-label">🔧 Technologies</div>
          <h2 className="section-title">
            Full{' '}
            <span className="gradient-text-purple">Technology Stack</span>
          </h2>
          <p className="section-subtitle">
            An end-to-end integration of best-in-class security, ML, and LLM tools — from raw code commits to verified patches.
          </p>
        </FadeSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {techStacks.map((stack, si) => (
            <FadeSection key={si}>
              <div style={{
                borderLeft: `3px solid ${stack.color}`,
                paddingLeft: '1.5rem',
                marginBottom: '1rem',
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: stack.color, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                  {stack.category.toUpperCase()}
                </h3>
                <div className="grid-4">
                  {stack.items.map((item, ii) => (
                    <div
                      key={ii}
                      className="card"
                      style={{ position: 'relative', overflow: 'hidden', padding: '1.5rem' }}
                    >
                      {/* Subtle top glow line */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: `linear-gradient(90deg, transparent, ${stack.color}, transparent)`,
                        opacity: 0.6,
                      }} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>{item.name}</h4>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: stack.color,
                          background: stack.colorDim,
                          padding: '0.2rem 0.5rem',
                          borderRadius: 4,
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginLeft: '0.5rem',
                        }}>
                          {item.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.7 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}
