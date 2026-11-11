import { ArrowUp } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-frame flex-col gap-3 border-x border-line px-5 py-5 font-mono text-[11.5px] uppercase tracking-[0.06em] text-subtle sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="hidden md:inline">Built with React · TypeScript · Tailwind CSS · Framer Motion</span>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
          Back to top <ArrowUp size={13} />
        </a>
      </div>
    </footer>
  )
}
