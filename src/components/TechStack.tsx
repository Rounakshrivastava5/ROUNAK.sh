import { ArrowRight } from 'lucide-react'
import { stack } from '../data/profile'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function TechStack() {
  const total = stack.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id="stack" aria-labelledby="stack-title" className="border-b border-line">
      <SectionHeader
        id="stack-title"
        index="03"
        label="Technical Stack"
        title="Core Technical Stack"
        aside={<span className="eyebrow">{total} tools · 5 domains</span>}
      />

      <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
        {stack.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.04} className="group flex flex-col bg-bg transition-colors hover:bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 lg:px-6">
              <h3 className="display text-[22px] leading-none tracking-wide">{group.label}</h3>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-fg"
              />
            </div>
            <ul className="flex-1 px-5 py-4 lg:px-6">
              {group.items.map((item, j) => (
                <li
                  key={item}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-line py-2 last:border-b-0"
                >
                  <span className="text-[15px] text-fg">{item}</span>
                  <span className="font-mono text-[11px] text-subtle tabular-nums">{String(j + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
