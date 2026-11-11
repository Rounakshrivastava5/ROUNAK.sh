import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import ExperienceTimeline from './components/ExperienceTimeline'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import ContactDrawer from './components/ContactDrawer'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 380, damping: 34 }}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-fg focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Header theme={theme} onToggleTheme={toggle} onContact={() => setDrawerOpen(true)} />
      <main id="main" className="mx-auto max-w-frame border-x border-line">
        <Hero onContact={() => setDrawerOpen(true)} />
        <ExperienceTimeline />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </MotionConfig>
  )
}
