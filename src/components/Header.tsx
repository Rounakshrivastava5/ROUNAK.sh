import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'

const NAV = [
  { id: 'experience', n: '01', label: 'Experience' },
  { id: 'projects', n: '02', label: 'Projects' },
  { id: 'stack', n: '03', label: 'Tech Stack' },
  { id: 'contact', n: '04', label: 'Contact' },
]
const IDS = NAV.map((n) => n.id)

type Props = { theme: Theme; onToggleTheme: () => void; onContact: () => void }

export function StatusChip({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 animate-ping2 rounded-full bg-signal" />
        <span className="relative h-2 w-2 rounded-full bg-signal" />
      </span>
      {profile.status}
    </span>
  )
}

export default function Header({ theme, onToggleTheme, onContact }: Props) {
  const active = useActiveSection(IDS)
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <div className="mx-auto flex h-16 max-w-frame items-stretch border-x border-line">
        <a
          href="#top"
          className="display flex items-center border-r border-line px-5 text-[26px] normal-case tracking-normal lg:px-8"
          aria-label="Rounak Shrivastava — back to top"
        >
          {profile.logo}
        </a>

        <nav aria-label="Primary" className="hidden flex-1 items-stretch lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative flex items-center gap-1.5 px-5 font-mono text-[12.5px] uppercase tracking-[0.06em] transition-colors xl:px-6 ${
                  isActive ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                <span className="text-subtle">/{item.n}</span>
                {item.label}
                {isActive && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-5 bottom-0 h-px bg-fg xl:inset-x-6" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 px-4 lg:px-6">
          <StatusChip className="hidden xl:inline-flex" />
          <button
            type="button"
            onClick={onToggleTheme}
            className="btn-icon h-9 w-9"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
              >
                {theme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button type="button" onClick={onContact} className="btn-ghost hidden h-9 px-4 sm:inline-flex">
            Contact
          </button>
          <button
            type="button"
            className="btn-icon h-9 w-9 lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <ul className="mx-auto max-w-frame divide-y divide-line border-x border-line">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-5 py-4 font-mono text-[13px] uppercase tracking-[0.06em]"
                  >
                    <span>
                      <span className="text-subtle">/{item.n} </span>
                      {item.label}
                    </span>
                    <span className="text-subtle">→</span>
                  </a>
                </li>
              ))}
              <li className="px-5 py-4">
                <StatusChip />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
