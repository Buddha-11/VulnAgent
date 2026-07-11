import { ShieldIcon as Shield, GitHubIcon } from './icons.jsx';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-900)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 1.5rem',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 32, height: 32,
            background: 'var(--gradient-cyan)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Shield size={16} color="#000" />
          </div>
          <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.9rem' }}>VulnAgent</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {['#overview', '#workflow', '#tech', '#metrics', '#literature', '#team'].map((href, i) => (
            <a
              key={href}
              href={href}
              style={{ color: '#475569', fontSize: '0.83rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#94a3b8'}
              onMouseLeave={e => e.target.style.color = '#475569'}
            >
              {['Overview', 'Pipeline', 'Tech Stack', 'Results', 'Research', 'Team'][i]}
            </a>
          ))}
        </div>

        {/* GitHub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a
            href="https://github.com/Buddha-11/VulnAgent"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.83rem', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.currentTarget.style.color = '#475569'}
          >
            <GitHubIcon size={15} />
            Buddha-11/VulnAgent
          </a>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border)',
        color: '#334155',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-mono)',
      }}>
        © 2025 Arpit Anand, Snehal Gupta, Ansh Namdeo · IIIT Allahabad · IIT2023170 / IIT2023169 / IIT2023141
      </div>
    </footer>
  );
}
