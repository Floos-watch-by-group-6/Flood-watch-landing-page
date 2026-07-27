/** The four notification copies used in the hero cluster (Figma variants 1–5). */
export const CARD_COPY = {
  flooding: {
    tone: 'alert',
    title: 'Flooding confirmed near you',
    subtitle: 'Admiralty Way, Lekki Phase 1, High severity, 4 confirmations',
  },
  verified: {
    tone: 'tick',
    title: 'Report now Verified',
    subtitle: 'Igbo-Efon Road reached 3 confirmations',
  },
  location: {
    // The double space is intentional — it is in the design.
    tone: 'tick',
    title: 'Location  changed sucessfully',
    subtitle: 'our report location has been updated',
  },
  posted: {
    tone: 'tick',
    title: 'Report posted',
    subtitle: 'Now visible in the Fee, Unverified until 3 confirmation',
  },
} as const

export type CardKind = keyof typeof CARD_COPY
