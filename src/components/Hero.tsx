import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, FileText, Mail } from 'lucide-react'
import { metrics, profile, type Metric } from '../data/profile'
import { useCountUp } from '../hooks/useCountUp'
import CodeInspector from './CodeInspector'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

function MetricCell({ m }: { m: Metric }) {
  const { ref, value } = useCountUp<HTMLDivElement>(m.value)
  return (
    <div ref={ref} className="group flex flex-col gap-1 px-5 py-6 lg:px-8">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[34px] font-medium leading-none tracking-tight tabular-nums lg:text-[40px]">
          {value}
          {m.suffix}
        </span>
        <span className="text-[15px] font-medium text-fg">{m.label}</span>
      </div>
      <span className="text-[13px] text-muted">{m.note}</span>
    </div>
  )
}

export default function Hero({ onContact }: { onContact: () => void }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="border-b border-line">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left — typographic statement */}
        <div className="flex flex-col border-b border-line lg:col-span-7 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-8">
            <span className="eyebrow">
              <span className="text-fg">00</span> / Overview
            </span>
            <span className="eyebrow hidden sm:inline">{profile.headline}</span>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10 px-5 pb-8 pt-8 lg:px-8 lg:pt-10">
            <div>
              <motion.p {...rise(0)} className="mb-5 font-mono text-[13px] text-muted">
                Hi, I&rsquo;m <span className="text-fg">{profile.name}</span> —
              </motion.p>
              <motion.h1
                id="hero-title"
                {...rise(0.05)}
                className="display text-[44px] sm:text-[64px] lg:text-[72px] xl:text-[88px]"
              >
                Senior Full Stack Engineer building enterprise web apps &amp;{' '}
                <span className="text-accent dark:outline-text">Gen AI integrations.</span>
              </motion.h1>
              <motion.p {...rise(0.12)} className="mt-7 max-w-[620px] text-[17px] leading-relaxed text-muted">
                {profile.bio}
              </motion.p>
            </div>

            <motion.div {...rise(0.18)} className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary">
                View Projects <ArrowDownRight size={16} strokeWidth={1.75} />
              </a>
              <a href={profile.resume} download={profile.resumeFileName} className="btn-ghost">
                <FileText size={15} strokeWidth={1.75} /> Resume (PDF)
              </a>
              <button type="button" onClick={onContact} className="btn-icon" aria-label="Quick contact">
                <Mail size={17} strokeWidth={1.75} />
              </button>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub profile">
                <GithubIcon />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn profile">
                <LinkedinIcon />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right — system inspector */}
        <div className="flex flex-col gap-4 bg-surface/40 px-5 py-6 lg:col-span-5 lg:px-8 lg:py-8">
          <motion.div {...rise(0.1)} className="flex-1">
            <CodeInspector />
          </motion.div>
          <motion.a
            {...rise(0.2)}
            href="#experience"
            className="group flex items-stretch border border-line bg-surface font-mono text-[12px] uppercase tracking-[0.06em] transition-colors hover:border-strong"
          >
            <span className="flex items-center bg-fg px-3.5 py-3 text-bg">Currently</span>
            <span className="flex min-w-0 flex-1 items-center gap-2 px-3.5 py-3 text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              Active <span className="text-subtle">|</span>
              <span className="truncate">{profile.current.company}</span>
            </span>
            <span className="flex items-center px-3 text-subtle transition-colors group-hover:text-fg">
              <ArrowUpRight size={15} />
            </span>
          </motion.a>
        </div>
      </div>

      {/* Metric bar */}
      <div className="grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {metrics.map((m) => (
          <MetricCell key={m.label} m={m} />
        ))}
      </div>
    </section>
  )
}
