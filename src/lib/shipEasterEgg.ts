export const SUMMON_SHIP_EVENT = 'vapor:summon-ship'

const CLICKS_NEEDED = 5
const MAX_GAP_MS = 800

let streak = 0
let lastClick = 0

/** Count rapid logo clicks; the fifth in a row sends an extra ship across the page. */
export function registerLogoClick() {
  const now = Date.now()
  streak = now - lastClick <= MAX_GAP_MS ? streak + 1 : 1
  lastClick = now

  if (streak >= CLICKS_NEEDED) {
    streak = 0
    window.dispatchEvent(new Event(SUMMON_SHIP_EVENT))
  }
}
