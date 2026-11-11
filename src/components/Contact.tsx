import { ArrowUpRight, FileText } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import ContactTerminal from './ContactTerminal'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'

const LINKS = [
  { label: 'GitHub', href: profile.github, handle: '@Rounakshrivastava5', Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.linkedin, handle: 'in/rounakshrivastava', Icon: LinkedinIcon },
  { label: 'Resume', href: profile.resume, handle: 'PDF · download', Icon: FileText, download: profile.resumeFileName },
] as const satisfies ReadonlyArray<{
  label: string
  href: string
  handle: string
  Icon: typeof FileText | typeof GithubIcon
  download?: string
}>

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <SectionHeader id="contact-title" index="04" label="Contact" title="Let's Build Something" />
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-8 border-b border-line px-5 py-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:px-8">
          <Reveal>
            <p className="max-w-md text-[17px] leading-relaxed text-muted">
              Open to senior full-stack and Gen AI engineering roles, and to collaborating on developer tooling.
              Send a note from the terminal, or copy the address in one click.
            </p>
          </Reveal>
          <ul className="border-t border-line">
            {LINKS.map((link) => {
              const { label, href, handle, Icon } = link
              const download = 'download' in link ? link.download : undefined
              return (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(download ? { download } : { target: '_blank', rel: 'noreferrer' })}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-fg"
                >
                  <Icon className="h-[18px] w-[18px] text-subtle transition-colors group-hover:text-fg" />
                  <span className="font-mono text-[13px] uppercase tracking-[0.06em]">{label}</span>
                  <span className="ml-auto font-mono text-[12.5px] text-subtle">{handle}</span>
                  <ArrowUpRight size={15} className="text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </a>
              </li>
              )
            })}
          </ul>
        </div>
        <div className="px-5 py-8 lg:col-span-7 lg:px-8">
          <Reveal>
            <ContactTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
