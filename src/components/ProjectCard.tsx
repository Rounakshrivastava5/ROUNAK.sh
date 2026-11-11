import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '../data/profile'
import { GithubIcon } from './BrandIcons'
import ProjectArt from './ProjectArt'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="group relative flex h-full flex-col bg-bg transition-colors duration-200 hover:bg-surface"
    >
      {/* Meta row */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3 lg:px-8">
        <span className="eyebrow">
          <span className="text-fg">{project.index}</span> / {project.kind}
        </span>
        <ArrowUpRight
          size={16}
          className="text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 px-5 py-6 sm:flex-row lg:px-8 lg:py-8">
        <div className="flex flex-1 flex-col">
          <h3 id={`${project.id}-title`} className="display text-[38px] lg:text-[44px]">
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-[12.5px] uppercase tracking-[0.05em] text-accent">{project.subtitle}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>
        </div>
        <div className="aspect-[22/15] w-full shrink-0 text-subtle transition-colors duration-200 group-hover:text-fg sm:w-[200px] lg:w-[220px]">
          <ProjectArt kind={project.art} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary h-9 px-3.5 text-[12px]"
              aria-label={`${project.name} live demo`}
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost h-9 px-3.5 text-[12px]"
            aria-label={`${project.name} source on GitHub`}
          >
            <GithubIcon className="h-3.5 w-3.5" /> Code
          </a>
        </div>
      </div>
    </article>
  )
}
