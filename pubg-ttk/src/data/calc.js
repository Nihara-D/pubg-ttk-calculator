import { HEADSHOT_MULTIPLIER } from './weapons'

const HEALTH_POOL = 100

export function falloffMultiplier(weapon, range) {
  const { start, end, floor } = weapon.falloff
  if (range <= start) return 1
  if (range >= end) return floor
  const t = (range - start) / (end - start)
  return 1 - t * (1 - floor)
}

export function fireInterval(weapon) {
  return weapon.auto ? weapon.fireInterval : weapon.practicalROF
}

// Blended average damage per shot, mixing headshot ratio (0-1) into bodyshots
export function avgDamagePerShot(weapon, range, armor, headshotRatio) {
  const base = weapon.damage * falloffMultiplier(weapon, range)
  const body = base * (1 - armor.bodyReduction)
  const head = base * HEADSHOT_MULTIPLIER * (1 - armor.headReduction)
  return body * (1 - headshotRatio) + head * headshotRatio
}

export function shotsToKill(weapon, range, armor, headshotRatio) {
  const dmg = avgDamagePerShot(weapon, range, armor, headshotRatio)
  return Math.max(1, Math.ceil(HEALTH_POOL / dmg))
}

export function ttk(weapon, range, armor, headshotRatio) {
  const shots = shotsToKill(weapon, range, armor, headshotRatio)
  const interval = fireInterval(weapon)
  return (shots - 1) * interval
}

export function dps(weapon, range, armor, headshotRatio) {
  return avgDamagePerShot(weapon, range, armor, headshotRatio) / fireInterval(weapon)
}
