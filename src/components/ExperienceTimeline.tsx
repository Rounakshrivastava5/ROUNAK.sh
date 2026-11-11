import { experience } from '../data/profile'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

export default function ExperienceTimeline() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-b border-line">
      <SectionHeader
        id="experience-title"
        index="01"
        label="Experience"
        title="Work Experience"
        aside={<span className="eyebrow">2022 — Present · 4+ yrs</span>}
      />

      <ol className="relative">
        {experience.map((job, i) => (
          <Reveal
            as="li"
            key={job.company}
            delay={i * 0.04}
            className="group grid grid-cols-1 border-b border-line last:border-b-0 md:grid-cols-12"
          >
            {/* Date rail */}
            <div className="relative flex items-start gap-3 px-5 pb-2 pt-6 md:col-span-3 md:border-r md:border-line md:py-8 lg:px-8">
              <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                {job.current && <span className="absolute inset-0 animate-ping2 rounded-full bg-signal" />}
                <span
                  className={`relative h-2.5 w-2.5 border ${
                    job.current ? 'rounded-full border-signal bg-signal' : 'border-strong bg-bg'
                  }`}
                />
              </span>
              <div className="font-mono text-[12.5px] uppercase tracking-[0.06em]">
                <div className="text-fg">
                  {job.start} — {job.end}
                </div>
                {job.current && <div className="mt-1 text-signal">● Current role</div>}
              </div>
            </div>

            {/* Role */}
            <div className="px-5 pb-8 pt-2 md:col-span-9 md:py-8 lg:px-8">
              <div className="grid gap-6 lg:grid-cols-9">
                <div className="lg:col-span-4">
                  <h3 className="text-[22px] font-semibold leading-tight tracking-tight">{job.company}</h3>
                  <p className="mt-1 font-mono text-[13px] text-muted">{job.role}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{job.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="mb-4 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
                    {job.kpis.map((k) => (
                      <div
                        key={k}
                        className="border-b border-r border-line px-3 py-2.5 font-mono text-[12px] uppercase tracking-[0.04em] text-fg"
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-strong/60" aria-hidden="true" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
