import { FadeSection, MetricBar, AnimatedCounter } from './utils.jsx';

const models = [
  {
    name: 'Gradient Boosting',
    label: 'Best Overall',
    color: 'var(--green)',
    colorDim: 'var(--green-dim)',
    metrics: {
      Accuracy: 0.8245,
      Precision: 0.8492,
      Recall: 0.9323,
      'F1-Score': 0.8887,
      'ROC-AUC': 0.9106,
    },
    threshold: '0.364',
    highlight: true,
    commentary: 'Highest F1 and ROC-AUC. Threshold tuned to maximize recall — catching 93.23% of real vulnerabilities is the priority in security-critical pipelines.',
  },
  {
    name: 'Random Forest',
    label: 'Best Accuracy',
    color: 'var(--cyan)',
    colorDim: 'var(--cyan-dim)',
    metrics: {
      Accuracy: 0.8341,
      Precision: 0.8251,
      Recall: 0.8909,
      'F1-Score': 0.8749,
      'ROC-AUC': 0.8881,
    },
    threshold: '0.414',
    commentary: 'Highest raw accuracy (0.8341). Strong ensemble model with 13-dim feature vector and weighted signal boosting.',
  },
  {
    name: 'SVM (RBF)',
    label: 'Baseline',
    color: 'var(--purple)',
    colorDim: 'var(--purple-dim)',
    metrics: {
      Accuracy: 0.8003,
      Precision: 0.8429,
      Recall: 0.8533,
      'F1-Score': 0.8480,
      'ROC-AUC': 0.8838,
    },
    threshold: '0.500',
    commentary: 'Competitive precision but lower recall. For security contexts where missing vulnerabilities is costlier than false alarms, tree-based models outperform.',
  },
];

const featureEvolution = [
  { label: 'Static Analysis (Raw SAST)', precision: 0.60, recall: 0.72, f1: 0.65, desc: 'No ML — CodeQL raw alerts with ~40% false positive rate.' },
  { label: 'Basic RF (Raw Features)', precision: 0.83, recall: 0.86, f1: 0.84, desc: 'Alert count, density, and location — basic metadata features.' },
  { label: 'Vectorized RF (13-dim + Weighted)', precision: 0.83, recall: 0.93, f1: 0.87, desc: '13-dim CWE vector + weighted signal boosting. Recall +7%.' },
];

export default function Metrics() {
  return (
    <section id="metrics" style={{ background: 'var(--bg-800)', padding: 'var(--section-padding)' }}>
      <div className="container">
        <FadeSection style={{ marginBottom: '4rem' }}>
          <div className="section-label">📊 Results</div>
          <h2 className="section-title">
            Performance{' '}
            <span className="gradient-text-green">Metrics</span>
          </h2>
          <p className="section-subtitle">
            After threshold optimization, Gradient Boosting achieves 93.23% recall — catching nearly every real vulnerability while maintaining 84.92% precision.
          </p>
        </FadeSection>

        {/* Model comparison cards */}
        <div className="grid-3" style={{ marginBottom: '5rem' }}>
          {models.map((model, mi) => (
            <FadeSection key={mi}>
              <div
                className="card"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  border: model.highlight ? `1px solid ${model.color}40` : undefined,
                  boxShadow: model.highlight ? `0 0 40px ${model.color}15` : undefined,
                }}
              >
                {model.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: model.color,
                    color: '#000',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.6rem',
                    borderRadius: 999,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em',
                  }}>
                    ★ BEST
                  </div>
                )}
                {/* Top accent */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${model.color}, transparent)`,
                }} />

                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '0.35rem' }}>{model.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: model.color,
                      background: model.colorDim,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 6,
                    }}>
                      {model.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#475569' }}>
                      threshold: {model.threshold}
                    </span>
                  </div>
                </div>

                {Object.entries(model.metrics).map(([key, val], vi) => (
                  <MetricBar
                    key={key}
                    label={key}
                    value={val}
                    color={model.color}
                    delay={vi * 100}
                  />
                ))}

                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.7, marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  {model.commentary}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Feature evolution table */}
        <FadeSection>
          <div style={{
            background: 'var(--surface-100)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: '3rem',
          }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                Feature Evolution: From Raw SAST to 13-Dimensional Vectorization
              </h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    {['Model / Stage', 'Precision', 'Recall', 'F1-Score', 'Notes'].map(h => (
                      <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', color: '#64748b', fontWeight: 600, borderBottom: '1px solid var(--border)', fontSize: '0.78rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureEvolution.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: '1px solid rgba(99,179,237,0.05)' }}>
                      <td style={{ padding: '1rem 1.25rem', color: '#e2e8f0', fontWeight: 600 }}>{row.label}</td>
                      <td style={{ padding: '1rem 1.25rem', color: row.precision >= 0.83 ? 'var(--green)' : 'var(--amber)' }}>{row.precision.toFixed(2)}</td>
                      <td style={{ padding: '1rem 1.25rem', color: row.recall >= 0.90 ? 'var(--green)' : row.recall >= 0.80 ? 'var(--cyan)' : 'var(--amber)' }}>{row.recall.toFixed(2)}</td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--cyan)' }}>{row.f1.toFixed(2)}</td>
                      <td style={{ padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.8rem' }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeSection>

        {/* Key takeaway stat boxes */}
        <FadeSection>
          <div className="grid-4">
            {[
              { value: 93.23, suffix: '%', label: 'Recall (GBM)', sub: 'True vulnerability detection', color: 'var(--green)' },
              { value: 84.92, suffix: '%', label: 'Precision (GBM)', sub: 'False alarm suppression', color: 'var(--cyan)' },
              { value: 91.06, suffix: '%', label: 'ROC-AUC (GBM)', sub: 'Classification quality', color: 'var(--purple)' },
              { value: 83.41, suffix: '%', label: 'Accuracy (RF)', sub: 'Overall correctness', color: 'var(--amber)' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '1.75rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: s.color, marginBottom: '0.5rem' }}>
                  <AnimatedCounter value={s.value} decimals={2} suffix={s.suffix} duration={1600 + i * 150} />
                </div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.78rem', color: '#475569' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
