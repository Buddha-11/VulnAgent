import { ExternalLinkIcon as ExternalLink, BookOpenIcon as BookOpen } from './icons.jsx';
import { FadeSection } from './utils.jsx';

const papers = [
  {
    id: 'BP1',
    label: 'Base Paper I',
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'Static Code Analysis Alarms Filtering Reloaded',
    authors: 'S. Habib & M. Pradel',
    venue: 'Empirical Software Engineering, 2022',
    href: 'https://dl.acm.org/doi/10.1007/s10664-021-10064-8',
    abstract: 'Constructs a dataset of 224,484 real-world SonarQube warnings from 9,958 Java GitHub projects, labelled by developer actions. Random Forest achieves accuracy=0.91, AUC=0.953 across 160 SonarQube rule types.',
    relevance: 'Primary methodological reference. Directly motivates our Random Forest classifier approach and code-context feature extraction strategy for SARIF alert triage.',
    tags: ['SAST', 'Random Forest', 'False-Positive Filtering', '224K Warnings'],
  },
  {
    id: 'BP2',
    label: 'Base Paper II',
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    title: 'Agentic AI for Autonomous Defense in Software Supply Chain Security',
    authors: 'T.A. Syed et al.',
    venue: 'arXiv:2512.23480, 2025',
    href: 'https://arxiv.org/abs/2512.23480',
    abstract: 'Multi-agent framework using LangChain/LangGraph with PPO-based RL policies and blockchain audit ledger. Achieves F1>0.93 across 4 vulnerability classes; reduces MTTM from 28 min to <6 min.',
    relevance: 'Provides agentic AI design principles (perceive–reason–act–learn loop) that inform our agentic triage and remediation layer architecture.',
    tags: ['Agentic AI', 'LangGraph', 'RL Policy', 'Supply Chain'],
  },
  {
    id: '3rd',
    label: 'Reference 3',
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    title: 'AgenticSCR: Autonomous Secure Code Review for Immature Vulnerabilities',
    authors: 'W. Charoenwet et al.',
    venue: 'FSE 2026',
    href: '#',
    abstract: 'Detector–validator subagent pair: detector loads SAST rules as long-term semantic memory; validator cross-checks against CWE knowledge tree. Achieves 17.5% correct comments — 153% above static LLM baseline.',
    relevance: 'The detector–validator pattern motivates our pipeline design where the ML classifier (detector) and agentic triage layer (validator) are distinct but complementary stages.',
    tags: ['Secure Code Review', 'Subagents', 'CWE Knowledge', 'Pre-commit'],
  },
  {
    id: 'RF',
    label: 'Foundational',
    color: 'var(--amber)',
    colorDim: 'var(--amber-dim)',
    title: 'Random Forests',
    authors: 'L. Breiman',
    venue: 'Machine Learning Journal, 2001',
    href: 'https://link.springer.com/article/10.1023/A:1010933404324',
    abstract: 'Foundational paper introducing the Random Forest ensemble algorithm. Parallel bagging over decision trees with random feature selection at each split — underpinning our model\'s robustness to noisy, high-dimensional feature vectors.',
    relevance: 'Random Forest is the primary ML classifier in our triage layer. This paper provides the theoretical foundation for why ensemble methods outperform individual classifiers on noisy security datasets.',
    tags: ['Ensemble', 'Bagging', 'Decision Trees', 'Feature Importance'],
  },
  {
    id: 'ZF',
    label: 'Related Work',
    color: 'var(--red)',
    colorDim: 'var(--red-dim)',
    title: 'ZeroFalse: LLM-Guided Precision Improvement for Static Analysis',
    authors: 'Iranmanesh et al.',
    venue: '2025',
    href: '#',
    abstract: 'Uses LLM prompting (rather than trained classifiers) as a precision improvement layer on top of static analysis tools. Demonstrates that LLMs can effectively filter false positives through semantic code understanding.',
    relevance: 'Closely related to our ML triage step but uses prompting vs. trained classifiers. Our approach uses ML filtering first, then LLM for remediation — complementary strategies.',
    tags: ['LLM', 'Precision', 'False Positive', 'Static Analysis'],
  },
  {
    id: 'OB',
    label: 'Dataset',
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    title: 'OWASP Benchmark Project',
    authors: 'OWASP Foundation',
    venue: '2023',
    href: 'https://owasp.org/www-project-benchmark/',
    abstract: 'A primary evaluation benchmark containing 2,766 fully labelled Java test cases across 8 vulnerability categories including SQL Injection, XSS, Path Traversal, and more. Used as ground-truth for ML training and validation.',
    relevance: 'The primary evaluation dataset for our ML classifier. Ground-truth labels from the benchmark enable us to precisely measure false-positive and true-positive rates.',
    tags: ['Benchmark', 'Java', 'Ground Truth', '2766 Test Cases'],
  },
];

export default function Literature() {
  return (
    <section id="literature" style={{ background: 'var(--bg-900)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ marginBottom: '4rem' }}>
          <div className="section-label">
            <BookOpen size={12} />
            Research Foundation
          </div>
          <h2 className="section-title">
            Academic{' '}
            <span className="gradient-text-purple">Literature</span>
          </h2>
          <p className="section-subtitle">
            This project synthesizes state-of-the-art research across ML-based alert filtering, agentic AI frameworks, and LLM-guided code security.
          </p>
        </FadeSection>

        <div className="grid-2" style={{ gap: '1.5rem' }}>
          {papers.map((paper, pi) => (
            <FadeSection key={pi}>
              <div className="card" style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
                {/* Top color bar */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: paper.color,
                  opacity: 0.7,
                }} />

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: paper.color,
                    background: paper.colorDim,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 6,
                    fontWeight: 600,
                  }}>
                    {paper.id} · {paper.label}
                  </span>
                  {paper.href !== '#' && (
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#475569', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = paper.color}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', lineHeight: 1.4, marginBottom: '0.35rem' }}>
                  {paper.title}
                </h3>

                <p style={{ fontSize: '0.78rem', color: '#4a5568', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  {paper.authors} — {paper.venue}
                </p>

                <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {paper.abstract}
                </p>

                {/* Relevance box */}
                <div style={{
                  background: paper.colorDim,
                  border: `1px solid ${paper.color}20`,
                  borderRadius: 8,
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{ fontSize: '0.7rem', color: paper.color, fontFamily: 'var(--font-mono)', fontWeight: 600, marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
                    RELEVANCE TO THIS PROJECT
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                    {paper.relevance}
                  </p>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {paper.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: '#475569',
                        border: '1px solid rgba(255,255,255,0.07)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 4,
                      }}
                    >
                      {tag}
                    </span>
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
