// All values are community-sourced approximations, since PUBG Corp has never
// published official weapon stats. Every wiki/datamining site disagrees
// slightly — these defaults are reasonable midpoints, but they're editable
// in the UI so you can tune them to match current patch notes or your own
// firing-range testing.
//
// fireInterval: seconds between shots at max sustained fire rate
// falloff: { start, end, floor } — full damage until `start`m, linear taper
//          to `floor` multiplier by `end`m, then flat
// practicalROF: for semi-auto/bolt-action, the realistic follow-up time a
//               skilled player achieves (trigger reset / bolt cycle), not
//               the mechanical minimum

export const WEAPONS = [
  {
    id: 'm416', name: 'M416', class: 'AR', ammo: '5.56mm',
    damage: 41, fireInterval: 0.0857, magazine: 30, magazineExt: 40,
    falloff: { start: 40, end: 200, floor: 0.7 }, auto: true,
  },
  {
    id: 'scarl', name: 'SCAR-L', class: 'AR', ammo: '5.56mm',
    damage: 41, fireInterval: 0.096, magazine: 30, magazineExt: 40,
    falloff: { start: 40, end: 200, floor: 0.72 }, auto: true,
  },
  {
    id: 'akm', name: 'AKM', class: 'AR', ammo: '7.62mm',
    damage: 47, fireInterval: 0.1, magazine: 30, magazineExt: 40,
    falloff: { start: 40, end: 200, floor: 0.65 }, auto: true,
  },
  {
    id: 'beryl', name: 'Beryl M762', class: 'AR', ammo: '7.62mm',
    damage: 44, fireInterval: 0.086, magazine: 30, magazineExt: 40,
    falloff: { start: 40, end: 200, floor: 0.65 }, auto: true,
  },
  {
    id: 'groza', name: 'Groza', class: 'AR (airdrop)', ammo: '7.62mm',
    damage: 47, fireInterval: 0.08, magazine: 30, magazineExt: 30,
    falloff: { start: 40, end: 200, floor: 0.68 }, auto: true,
  },
  {
    id: 'vector', name: 'Vector', class: 'SMG', ammo: '.45 ACP',
    damage: 31, fireInterval: 0.055, magazine: 13, magazineExt: 33,
    falloff: { start: 20, end: 100, floor: 0.55 }, auto: true,
  },
  {
    id: 'ump45', name: 'UMP45', class: 'SMG', ammo: '.45 ACP',
    damage: 41, fireInterval: 0.092, magazine: 25, magazineExt: 35,
    falloff: { start: 20, end: 100, floor: 0.6 }, auto: true,
  },
  {
    id: 'mini14', name: 'Mini 14', class: 'DMR', ammo: '5.56mm',
    damage: 46, fireInterval: null, practicalROF: 0.28, magazine: 20, magazineExt: 20,
    falloff: { start: 100, end: 300, floor: 0.8 }, auto: false,
  },
  {
    id: 'sks', name: 'SKS', class: 'DMR', ammo: '7.62mm',
    damage: 53, fireInterval: null, practicalROF: 0.3, magazine: 10, magazineExt: 20,
    falloff: { start: 100, end: 300, floor: 0.75 }, auto: false,
  },
  {
    id: 'kar98k', name: 'Kar98k', class: 'Sniper', ammo: '7.62mm',
    damage: 79, fireInterval: null, practicalROF: 1.5, magazine: 5, magazineExt: 5,
    falloff: { start: 150, end: 400, floor: 0.85 }, auto: false,
  },
  {
    id: 'awm', name: 'AWM', class: 'Sniper (airdrop)', ammo: '.300 Magnum',
    damage: 105, fireInterval: null, practicalROF: 1.7, magazine: 5, magazineExt: 5,
    falloff: { start: 150, end: 400, floor: 0.9 }, auto: false,
  },
]

// Approximate body-shot damage reduction by armor level (community consensus,
// not official). Headshots take a smaller reduction from helmets.
export const ARMOR = [
  { level: 0, label: 'None', bodyReduction: 0, headReduction: 0 },
  { level: 1, label: 'Level 1', bodyReduction: 0.3, headReduction: 0.3 },
  { level: 2, label: 'Level 2', bodyReduction: 0.4, headReduction: 0.4 },
  { level: 3, label: 'Level 3', bodyReduction: 0.55, headReduction: 0.55 },
]

export const HEADSHOT_MULTIPLIER = 2.0
