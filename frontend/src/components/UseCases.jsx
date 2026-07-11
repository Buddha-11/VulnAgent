import { ShieldIcon as Shield, ZapIcon as Zap, BrainIcon as Brain, CodeIcon as Code, DatabaseIcon as Database, LockIcon as Lock } from './icons.jsx';
import { FadeSection } from './utils.jsx';

const useCases = [
  {
    icon: Code,
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'Java Web Application Security',
    description: 'Automatically detect and fix SQL Injection, XSS, Path Traversal, and Command Injection vulnerabilities in Java Spring/Servlet applications before they reach production.',
    example: 'SQL Injection in BenchmarkTest*.java → ML triage → Llama patch → verified fix',
  },
  {
    icon: Zap,
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    title: 'DevSecOps Pipeline Integration',
    description: 'Embed security scanning directly into CI/CD pipelines. Jenkins webhook triggers mean security checks happen on every single commit — zero-friction for developers.',
    example: 'git push → webhook → SAST + DAST scan → ML filter → auto-patch → auto-commit',
  },
  {
    icon: Brain,
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    title: 'False Positive Suppression',
    description: 'Standard SAST tools generate massive alert noise (~40% FP rate). The 13-dim ML classifier cuts false positives dramatically, ensuring security engineers focus only on real threats.',
    example: '1000 raw alerts → ML filter → ~400 confirmed vulnerabilities (60% FP eliminated)',
  },
  {
    icon: Lock,
    color: 'var(--amber)',
    colorDim: 'var(--amber-dim)',
    title: 'Academic & Benchmark Evaluation',
    description: 'Evaluate and improve ML models for vulnerability classification on the OWASP Benchmark — a gold-standard dataset of 2,766 labelled Java test cases across 8 CWE categories.',
    example: 'OWASP Benchmark 2766 test cases → precision/recall metrics → model comparison',
  },
  {
    icon: Database,
    color: 'var(--red)',
    colorDim: 'var(--red-dim)',
    title: 'Research Platform for ML Security',
    description: 'The modular pipeline (feature engineering → vectorization → threshold optimization) serves as a research platform for experimenting with advanced ML approaches to SAST alert triage.',
    example: 'Swap classifiers, tune thresholds, add new CWE dimensions — fully configurable',
  },
  {
    icon: Shield,
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'Automated Security Hardening',
    description: 'Self-healing code that patches itself. Verified via compiler + re-scan before commit — no manual code review needed for well-understood vulnerability patterns.',
    example: 'Zero developer intervention for SQL Injection / Path Traversal pattern fixes',
  },
];

export default function UseCases() {
  return (
    <section id="overview" style={{ background: 'var(--bg-700)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ marginBottom: '4rem' }}>
          <div className="section-label">🎯 Use Cases</div>
          <h2 className="section-title">
            What This{' '}
            <span className="gradient-text-cyan">System Does</span>
          </h2>
          <p className="section-subtitle">
            From raw Java repositories to verified, self-patched, security-hardened codebases — fully autonomously.
          </p>
        </FadeSection>

        <div className="grid-3">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <FadeSection key={i}>
                <div className="card" style={{ height: '100%' }}>
                  {/* Icon */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: uc.colorDim,
                    border: `1px solid ${uc.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={24} color={uc.color} />
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {uc.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                    {uc.description}
                  </p>

                  {/* Example box */}
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '0.75rem 1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#475569',
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: uc.color }}>→ </span>
                    {uc.example}
                  </div>
                </div>
              </FadeSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
