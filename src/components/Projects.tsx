import { useMemo, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { projects } from '../data/profile'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const FILTERS = ['All', 'AI Tooling', 'Extensions', 'Realtime'] as const
type Filter = (typeof FILTERS)[number]

const match = (f: Filter, kind: string, stack: string[]) => {
  if (f === 'All') return true
  if (f === 'Extensions') return /Extension/.test(kind)
  if (f === 'AI Tooling') return /AI|LLM|OpenAI/.test(kind + stack.join(' '))
  return /Realtime/.test(kind)
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = useMemo(() => projects.filter((p) => match(filter, p.kind, p.stack)), [filter])

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-b border-line">
      <SectionHeader
        id="projects-title"
        index="02"
        label="Projects"
        title="Projects"
        aside={
          <LayoutGroup id="project-filter">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap border border-line">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`relative px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.06em] transition-colors ${
                    filter === f ? 'text-bg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {filter === f && <motion.span layoutId="filter-pill" className="absolute inset-0 bg-fg" />}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        }
      />

      <motion.div layout className="grid grid-cols-1 gap-px bg-line lg:grid-cols-2">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
        {visible.length % 2 === 1 && <div className="hidden bg-bg lg:block" aria-hidden="true" />}
      </motion.div>
    </section>
  )
}
