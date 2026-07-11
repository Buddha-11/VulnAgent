import { ExternalLinkIcon as ExternalLink, ChevronDownIcon as ChevronDown, ZapIcon as Zap, ShieldCheckIcon as ShieldCheck, BrainIcon as Brain, GitHubIcon } from './icons.jsx';
import { AnimatedCounter, FadeSection } from './utils.jsx';

const badges = [
  { label: 'SAST + DAST', color: 'tag-cyan' },
  { label: 'LLM Self-Healing', color: 'tag-green' },
  { label: 'ML Triage', color: 'tag-purple' },
  { label: 'CI/CD Integrated', color: 'tag-amber' },
];

const quickStats = [
  { value: 93, suffix: '%', label: 'Recall Rate', color: 'var(--green)' },
  { value: 91, suffix: '%', label: 'ROC-AUC', color: 'var(--cyan)' },
  { value: 70, suffix: 'B', label: 'Llama Params', color: 'var(--purple)' },
  { value: 13, suffix: 'D', label: 'Feature Vector', color: 'var(--amber)' },
];

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--gradient-hero)',
      padding: '8rem 1.5rem 4rem',
    }}>
      {/* Background orbs */}
      <div className="orb" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)',
        top: '-15%', left: '-10%',
        animation: 'float1 12s ease-in-out infinite',
      }} />
      <div className="orb" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        bottom: '-10%', right: '-10%',
        animation: 'float2 15s ease-in-out infinite',
      }} />
      <div className="orb" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,255,140,0.15) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'float3 10s ease-in-out infinite',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', textAlign: 'center' }}>
        {/* Badges */}
        <FadeSection>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
            {badges.map(b => (
              <span key={b.label} className={`tag ${b.color}`}>{b.label}</span>
            ))}
          </div>
        </FadeSection>

        {/* Headline */}
        <FadeSection>
          <h1 style={{
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ color: '#f1f5f9' }}>Agentic AI for</span>
            <br />
            <span className="gradient-text-cyan">Autonomous Vulnerability</span>
            <br />
            <span style={{ color: '#f1f5f9' }}>Detection &amp; Self-Healing</span>
          </h1>
        </FadeSection>

        {/* Subtitle */}
        <FadeSection>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#94a3b8',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
          }}>
            A fully autonomous security pipeline that detects Java vulnerabilities via
            <strong style={{ color: '#e2e8f0' }}> CodeQL SAST</strong> + <strong style={{ color: '#e2e8f0' }}>OWASP ZAP DAST</strong>,
            triages false positives with a <strong style={{ color: '#e2e8f0' }}>13-dimensional ML classifier</strong>,
            and generates context-aware patches using <strong style={{ color: '#e2e8f0' }}>Llama-3.3-70B</strong> — all integrated into Jenkins CI/CD.
          </p>
        </FadeSection>

        {/* CTA Buttons */}
        <FadeSection>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <a
              href="https://github.com/Buddha-11/VulnAgent"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <GitHubIcon size={18} />
              View on GitHub
            </a>
            <a href="#workflow" className="btn btn-secondary">
              <Zap size={18} />
              Explore Pipeline
            </a>
          </div>
        </FadeSection>

        {/* Stats row */}
        <FadeSection>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            {quickStats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="stat-number" style={{ color: s.color, fontSize: '2.2rem' }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} duration={1500 + i * 200} />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s ease-in-out infinite',
        color: '#475569',
      }}>
        <ChevronDown size={28} />
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.05); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(1.08); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%,-50%) scale(1); }
          50% { transform: translate(-50%,-50%) scale(1.12); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 640px) {
          .stat-number { font-size: 1.5rem !important; }
          div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
