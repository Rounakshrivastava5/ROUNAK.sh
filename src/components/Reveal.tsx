import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }

/** Subtle fade + 8px rise, once, when scrolled into view. */
export default function Reveal({ children, delay = 0, className, as = 'div' }: Props) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  )
}
