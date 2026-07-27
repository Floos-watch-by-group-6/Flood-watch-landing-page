/**
 * Dev utility: render the running dev server to a PNG so changes can be
 * checked visually against the Figma frame.
 *
 *   node scripts/screenshot.mjs [url] [out] [width] [height]
 */
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://localhost:5173/'
const out = process.argv[3] ?? 'shot.png'
const width = Number(process.argv[4] ?? 1440)
const height = Number(process.argv[5] ?? 1200)

// STATIC=1 emulates prefers-reduced-motion, which parks every element at its
// resting position — required for pixel comparison against the Figma frame,
// since the idle float loop otherwise shifts cards by a few px per capture.
const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: 1,
  reducedMotion: process.env.STATIC ? 'reduce' : 'no-preference',
})

const problems = []
page.on('console', (m) => m.type() === 'error' && problems.push(m.text()))
page.on('pageerror', (e) => problems.push(String(e)))
page.on('requestfailed', (r) =>
  problems.push(`FAILED ${r.url()} — ${r.failure()?.errorText}`),
)

await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

// Scroll the whole page so scroll-triggered (`inView`) animations fire — a
// fullPage screenshot does not scroll, so anything below the fold would
// otherwise be captured in its hidden state.
// IntersectionObserver delivers asynchronously, so each stop has to outlast a
// couple of frames or the observers never latch and everything below the fold
// stays in its hidden state.
await page.evaluate(async () => {
  const settle = () =>
    new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
  const step = window.innerHeight / 2
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await settle()
    await new Promise((r) => setTimeout(r, 220))
  }
  await new Promise((r) => setTimeout(r, 400))
  window.scrollTo(0, 0)
  await settle()
})

// Let entrance animations settle so the capture is deterministic.
await page.waitForTimeout(3000)
await page.screenshot({ path: out, fullPage: true })
await browser.close()

console.log(problems.length ? `PROBLEMS:\n${problems.join('\n')}` : 'clean: no console or network errors')
