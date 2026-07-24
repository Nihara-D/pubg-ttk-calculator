const W = 640, H = 260, PAD_L = 44, PAD_B = 28, PAD_T = 14, PAD_R = 14

export default function TTKChart({ curveA, curveB, colorA, colorB, maxRange }) {
  const plotW = W - PAD_L - PAD_R
  const plotH = H - PAD_T - PAD_B

  const allVals = [...curveA, ...curveB].map(p => p.ttk)
  const maxTTK = Math.max(0.4, ...allVals) * 1.15

  const xScale = (range) => PAD_L + (range / maxRange) * plotW
  const yScale = (ttk) => PAD_T + plotH - (ttk / maxTTK) * plotH

  const path = (curve) => curve.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${xScale(p.range).toFixed(1)},${yScale(p.ttk).toFixed(1)}`
  ).join(' ')

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => t * maxTTK)
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(t * maxRange))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD_L} x2={W - PAD_R} y1={yScale(t)} y2={yScale(t)}
            stroke="var(--line)" strokeWidth="1" />
          <text x={PAD_L - 8} y={yScale(t) + 3} textAnchor="end" fontSize="9"
            fill="var(--text-dim)" fontFamily="var(--font-mono)">
            {t.toFixed(2)}s
          </text>
        </g>
      ))}
      {xTicks.map((t, i) => (
        <text key={i} x={xScale(t)} y={H - PAD_B + 16} textAnchor="middle" fontSize="9"
          fill="var(--text-dim)" fontFamily="var(--font-mono)">
          {t}m
        </text>
      ))}

      <line x1={PAD_L} x2={W - PAD_R} y1={H - PAD_B} y2={H - PAD_B} stroke="var(--line-strong)" />
      <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={H - PAD_B} stroke="var(--line-strong)" />

      <path key={`a-${curveA.map(p => p.ttk.toFixed(2)).join(',')}`}
        className="ttk-path" d={path(curveA)} fill="none" stroke={colorA} strokeWidth="2"
        strokeDasharray="1800" />
      <path key={`b-${curveB.map(p => p.ttk.toFixed(2)).join(',')}`}
        className="ttk-path" d={path(curveB)} fill="none" stroke={colorB} strokeWidth="2"
        strokeDasharray="1800" />

      {/* endpoint markers pulse gently to draw the eye */}
      <circle cx={xScale(curveA[curveA.length - 1].range)} cy={yScale(curveA[curveA.length - 1].ttk)}
        r="2.5" fill={colorA} opacity="0.9" />
      <circle cx={xScale(curveB[curveB.length - 1].range)} cy={yScale(curveB[curveB.length - 1].ttk)}
        r="2.5" fill={colorB} opacity="0.9" />
    </svg>
  )
}
