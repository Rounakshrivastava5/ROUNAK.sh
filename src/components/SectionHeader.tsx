import type { ReactNode } from 'react'

type Props = { index: string; label: string; title: string; aside?: ReactNode; id?: string }

export default function SectionHeader({ index, label, title, aside, id }: Props) {
  return (
    <div className="grid grid-cols-1 border-b border-line md:grid-cols-12">
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 md:col-span-3 md:border-b-0 md:border-r lg:px-8">
        <span className="eyebrow text-fg">{index}</span>
        <span className="eyebrow">/</span>
        <span className="eyebrow">{label}</span>
      </div>
      <div className="flex flex-col gap-3 px-5 py-6 md:col-span-9 md:flex-row md:items-end md:justify-between lg:px-8">
        <h2 id={id} className="display text-[44px] sm:text-[56px] lg:text-[68px]">
          {title}
        </h2>
        {aside}
      </div>
    </div>
  )
}
