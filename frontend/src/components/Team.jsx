import { LinkedinIcon as Linkedin, MailIcon as Mail, GraduationCapIcon as GraduationCap, GitHubIcon } from './icons.jsx';
import { FadeSection } from './utils.jsx';

const team = [
  {
    name: 'Arpit Anand',
    id: 'IIT2023170',
    role: 'Lead Developer',
    focus: 'ML Pipeline, LLM Integration & CI/CD Architecture',
    github: 'https://github.com/Buddha-11',
    initials: 'AA',
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    gradient: 'var(--gradient-cyan)',
    contributions: ['Agent pipeline design', 'ML feature engineering', 'Jenkins CI/CD setup', 'Groq LLM integration'],
  },
  {
    name: 'Snehal Gupta',
    id: 'IIT2023169',
    role: 'Co-Developer',
    focus: 'SAST Analysis & Feature Design',
    github: '#',
    initials: 'SG',
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    gradient: 'var(--gradient-purple)',
    contributions: ['CodeQL query design', 'SARIF parsing', 'Feature vectorization', 'Model evaluation'],
  },
  {
    name: 'Ansh Namdeo',
    id: 'IIT2023141',
    role: 'Co-Developer',
    focus: 'DAST Integration & Validation',
    github: '#',
    initials: 'AN',
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    gradient: 'var(--gradient-green)',
    contributions: ['OWASP ZAP integration', 'Tomcat deployment', 'Patch validation loop', 'Report generation'],
  },
];

export default function Team() {
  return (
    <section id="team" style={{ background: 'var(--bg-800)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">
            <GraduationCap size={12} />
            The Team
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Built by Students at{' '}
            <span className="gradient-text-cyan">IIIT Allahabad</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
            A Semester 6 project at the Indian Institute of Information Technology, Allahabad.
          </p>
        </FadeSection>

        <div className="grid-3" style={{ maxWidth: 900, margin: '0 auto 4rem' }}>
          {team.map((member, mi) => (
            <FadeSection key={mi}>
              <div className="card" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Top gradient bar */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: member.gradient,
                }} />

                {/* Avatar */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: member.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#000',
                  letterSpacing: '-0.02em',
                  boxShadow: `0 8px 30px ${member.color}30`,
                }}>
                  {member.initials}
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.25rem' }}>
                  {member.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: member.color, marginBottom: '0.5rem' }}>
                  {member.id}
                </div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.78rem',
                  color: '#64748b',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '0.25rem 0.75rem',
                  marginBottom: '0.5rem',
                }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  {member.focus}
                </p>

                {/* Contributions */}
                <div style={{ textAlign: 'left' }}>
                  {member.contributions.map((c, ci) => (
                    <div key={ci} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0', borderBottom: ci < member.contributions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <span style={{ color: member.color, fontSize: '0.65rem' }}>▹</span>
                      <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{c}</span>
                    </div>
                  ))}
                </div>

                {member.github !== '#' && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center', padding: '0.6rem 1rem', fontSize: '0.83rem' }}
                  >
                    <GitHubIcon size={15} />
                    GitHub Profile
                  </a>
                )}
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Institution card */}
        <FadeSection>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(168,85,247,0.06) 100%)',
            border: '1px solid var(--border-bright)',
            borderRadius: 20,
            padding: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            <div style={{
              width: 64,
              height: 64,
              background: 'var(--gradient-cyan)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <GraduationCap size={32} color="#000" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.35rem' }}>
                Indian Institute of Information Technology, Allahabad
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0.75rem' }}>
                Semester 6 Project — B.Tech. Information Technology
              </p>
              <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.7 }}>
                This project was developed as part of the academic curriculum at IIITA,
                combining applied machine learning, natural language processing, and software security research
                into a fully functional agentic pipeline.
              </p>
            </div>
            <div>
              <a
                href="https://github.com/Buddha-11/VulnAgent"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <GitHubIcon size={18} />
                View Repository
              </a>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
