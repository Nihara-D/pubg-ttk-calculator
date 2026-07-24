import { useMemo, useState } from 'react'
import { WEAPONS, ARMOR } from './data/weapons'
import { ttk, shotsToKill } from './data/calc'
import WeaponPanel from './components/WeaponPanel'
import TTKChart from './components/TTKChart'

const MAX_RANGE = 250

function cloneWeapon(w) { return JSON.parse(JSON.stringify(w)) }

export default function App() {
  const [weaponsA, setWeaponsA] = useState(() => WEAPONS.map(cloneWeapon))
  const [weaponsB, setWeaponsB] = useState(() => WEAPONS.map(cloneWeapon))
  const [idA, setIdA] = useState('m416')
  const [idB, setIdB] = useState('akm')
  const [armorLevel, setArmorLevel] = useState(2)
  const [headshotPct, setHeadshotPct] = useState(0)
  const [range, setRange] = useState(50)

  const armor = ARMOR[armorLevel]
  const weaponA = weaponsA.find(w => w.id === idA)
  const weaponB = weaponsB.find(w => w.id === idB)
  const headshotRatio = headshotPct / 100

  function editA(patch) {
    setWeaponsA(prev => prev.map(w => w.id === idA ? { ...w, ...patch } : w))
  }
  function editB(patch) {
    setWeaponsB(prev => prev.map(w => w.id === idB ? { ...w, ...patch } : w))
  }

  const curveA = useMemo(() => buildCurve(weaponA, armor, headshotRatio), [weaponA, armor, headshotRatio])
  const curveB = useMemo(() => buildCurve(weaponB, armor, headshotRatio), [weaponB, armor, headshotRatio])

  const ttkA = ttk(weaponA, range, armor, headshotRatio)
  const ttkB = ttk(weaponB, range, armor, headshotRatio)
  const shotsA = shotsToKill(weaponA, range, armor, headshotRatio)
  const shotsB = shotsToKill(weaponB, range, armor, headshotRatio)
  const winner = ttkA < ttkB ? 'A' : ttkA > ttkB ? 'B' : null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)', padding: '24px 28px' }}>
      <header className="hud-flicker" style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.04em', fontWeight: 700,
        }}>
          WEAPON MATCHUP CALCULATOR
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', marginTop: 2 }}>
          TIME-TO-KILL BY RANGE · ARMOR · HEADSHOT RATIO — VALUES ARE EDITABLE, COMMUNITY-SOURCED APPROXIMATIONS
        </div>
      </header>

      <div className="fade-slide-up" style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap', animationDelay: '0.08s' }}>
        <WeaponPanel label="LOADOUT A" color="var(--accent)" weapon={weaponA} weapons={weaponsA}
          onSelect={setIdA} onEdit={editA} />
        <WeaponPanel label="LOADOUT B" color="var(--blue)" weapon={weaponB} weapons={weaponsB}
          onSelect={setIdB} onEdit={editB} />
      </div>

      <div className="fade-slide-up" style={{
        display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap',
        background: 'var(--bg-panel)', border: '1px solid var(--line-strong)', padding: '14px 18px',
        animationDelay: '0.16s',
      }}>
        <Control label={`ARMOR: ${armor.label}`}>
          <input type="range" min="0" max="3" step="1" value={armorLevel}
            onChange={e => setArmorLevel(parseInt(e.target.value))} style={{ width: 160 }} />
        </Control>
        <Control label={`HEADSHOT RATIO: ${headshotPct}%`}>
          <input type="range" min="0" max="100" step="5" value={headshotPct}
            onChange={e => setHeadshotPct(parseInt(e.target.value))} style={{ width: 160 }} />
        </Control>
        <Control label={`ENGAGEMENT RANGE: ${range}m`}>
          <input type="range" min="5" max={MAX_RANGE} step="5" value={range}
            onChange={e => setRange(parseInt(e.target.value))} style={{ width: 160 }} />
        </Control>
      </div>

      <div className="fade-slide-up" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animationDelay: '0.24s' }}>
        <div style={{ flex: '2 1 480px', background: 'var(--bg-panel)', border: '1px solid var(--line-strong)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', marginBottom: 10 }}>
            TTK VS RANGE (0–{MAX_RANGE}m)
          </div>
          <TTKChart curveA={curveA} curveB={curveB} colorA="var(--accent)" colorB="var(--blue)" maxRange={MAX_RANGE} />
          <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 11 }}>
            <Legend color="var(--accent)" name={weaponA.name} />
            <Legend color="var(--blue)" name={weaponB.name} />
          </div>
        </div>

        <div style={{ flex: '1 1 260px', background: 'var(--bg-panel)', border: '1px solid var(--line-strong)', padding: '16px 18px' }}>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', marginBottom: 14 }}>
            AT {range}m
          </div>
          <Result label={weaponA.name} color="var(--accent)" ttkVal={ttkA} shots={shotsA} isWinner={winner === 'A'} />
          <Result label={weaponB.name} color="var(--blue)" ttkVal={ttkB} shots={shotsB} isWinner={winner === 'B'} />
          {winner && (
            <div key={`${winner}-${range}-${armorLevel}-${headshotPct}`} className="flash-update winner-pulse" style={{
              marginTop: 14, padding: '10px 12px', fontSize: 12, lineHeight: 1.5, borderRadius: 2,
              background: winner === 'A' ? 'var(--accent-dim)' : 'var(--blue-dim)',
              color: 'var(--text-hi)', border: `1px solid ${winner === 'A' ? 'var(--accent)' : 'var(--blue)'}`,
            }}>
              {(winner === 'A' ? weaponA.name : weaponB.name)} kills{' '}
              {Math.abs(ttkA - ttkB).toFixed(2)}s faster at {range}m under {armor.label.toLowerCase()} armor.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function buildCurve(weapon, armor, headshotRatio) {
  const points = []
  for (let r = 0; r <= MAX_RANGE; r += 5) {
    points.push({ range: r, ttk: ttk(weapon, r, armor, headshotRatio) })
  }
  return points
}

function Control({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 10.5, color: 'var(--text-mid)', letterSpacing: '0.06em' }}>{label}</span>
      {children}
    </label>
  )
}

function Legend({ color, name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 10, height: 10, background: color, display: 'inline-block' }} />
      <span style={{ color: 'var(--text-mid)' }}>{name}</span>
    </div>
  )
}

function Result({ label, color, ttkVal, shots, isWinner }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: '1px solid var(--line)',
    }}>
      <div>
        <div style={{ fontSize: 13, color, fontWeight: 600 }}>{label}{isWinner ? ' ★' : ''}</div>
        <div style={{ fontSize: 10.5, color: 'var(--text-dim)' }}>{shots} shots to kill</div>
      </div>
      <div key={ttkVal.toFixed(2)} className="number-tick"
        style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>
        {ttkVal.toFixed(2)}s
      </div>
    </div>
  )
}
