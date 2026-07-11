import { useState, useEffect } from 'react';
import { ShieldIcon as Shield, MenuIcon as Menu, XIcon as X, GitHubIcon } from './icons.jsx';

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#workflow', label: 'Pipeline' },
  { href: '#tech', label: 'Tech Stack' },
  { href: '#metrics', label: 'Results' },
  { href: '#literature', label: 'Research' },
  { href: '#team', label: 'Team' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled
        ? 'rgba(6, 13, 20, 0.85)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(99, 179, 237, 0.1)' : 'none',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'var(--gradient-cyan)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Shield size={20} color="#000" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', letterSpacing: '-0.01em' }}>
            VulnAgent
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '0.45rem 0.85rem',
                borderRadius: 8,
                fontSize: '0.88rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.color = '#fff'; e.target.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = '#94a3b8'; e.target.style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a
            href="https://github.com/Buddha-11/VulnAgent"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '0.5rem',
              color: '#fff',
              cursor: 'pointer',
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'rgba(6, 13, 20, 0.97)',
          borderTop: '1px solid var(--border)',
          padding: '1rem 1.5rem',
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                color: '#94a3b8',
                textDecoration: 'none',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--border)',
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
