export default function WeaponPanel({ label, color, weapon, weapons, onSelect, onEdit }) {
  return (
    <div style={{
      background: 'var(--bg-panel)', border: `1px solid ${color}`,
      padding: '14px 16px', flex: 1, minWidth: 0,
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.12em',
        color, fontWeight: 600, marginBottom: 10,
      }}>
        {label}
      </div>

      <select
        value={weapon.id}
        onChange={(e) => onSelect(e.target.value)}
        className="focus-ring"
        style={{
          width: '100%', background: 'var(--bg-panel-raised)', color: 'var(--text-hi)',
          border: '1px solid var(--line-strong)', padding: '8px 10px', fontSize: 14,
          marginBottom: 12,
        }}
      >
        {weapons.map(w => (
          <option key={w.id} value={w.id}>{w.name} — {w.class}</option>
        ))}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
        <EditField label="DAMAGE" value={weapon.damage}
          onChange={v => onEdit({ damage: v })} />
        <EditField label={weapon.auto ? 'FIRE INTERVAL (s)' : 'FOLLOW-UP (s)'}
          value={weapon.auto ? weapon.fireInterval : weapon.practicalROF}
          step="0.001"
          onChange={v => onEdit(weapon.auto ? { fireInterval: v } : { practicalROF: v })} />
        <EditField label="MAGAZINE" value={weapon.magazine}
          onChange={v => onEdit({ magazine: v })} />
        <EditField label="FALLOFF START (m)" value={weapon.falloff.start}
          onChange={v => onEdit({ falloff: { ...weapon.falloff, start: v } })} />
      </div>
    </div>
  )
}

function EditField({ label, value, onChange, step = '1' }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ color: 'var(--text-dim)', letterSpacing: '0.04em', fontSize: 9.5 }}>{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="focus-ring"
        style={{
          background: 'var(--bg-void)', border: '1px solid var(--line-strong)',
          color: 'var(--text-hi)', padding: '5px 7px', fontSize: 12, width: '100%',
        }}
      />
    </label>
  )
}
