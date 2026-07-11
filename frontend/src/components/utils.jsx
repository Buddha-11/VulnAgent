import { useEffect, useRef, useState } from 'react';

// ─── useInView Hook ──────────────────────────────────────────────────────────
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ─── Animated Counter ────────────────────────────────────────────────────────
export function AnimatedCounter({ value, suffix = '', decimals = 0, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(value);
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
}

// ─── Metric Bar ──────────────────────────────────────────────────────────────
export function MetricBar({ value, color, label, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setWidth(value * 100), delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <div ref={ref} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: color }}>{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{
            width: `${width}%`,
            background: color,
            transition: `width 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
          }}
        />
      </div>
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
export function FadeSection({ children, className = '', id }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      id={id}
      className={`${className} fade-up ${inView ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
}
