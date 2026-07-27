import { MotionConfig } from 'motion/react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeatureSection from './components/FeatureSection'
import LiveSection from './components/LiveSection'
import HonestSection from './components/HonestSection'
import LagosSection from './components/LagosSection'
import StayDrySection from './components/StayDrySection'
import SiteFooter from './components/SiteFooter'

export default function App() {
  return (
    // `reducedMotion="user"` makes every Motion animation in the tree honour the
    // OS setting, including third-party components like BlurFade that don't
    // check it themselves. Opacity still animates; transforms are skipped.
    <MotionConfig reducedMotion="user">
      <div className="min-h-svh w-full overflow-x-hidden bg-white font-sans">
        <Header />
        <Hero />
        <FeatureSection />
        <LiveSection />
        <HonestSection />
        <LagosSection />
        <StayDrySection />
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}
