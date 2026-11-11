import { useId, useRef, useState, type FormEvent } from 'react'
import { Check, Copy, CornerDownLeft } from 'lucide-react'
import { profile } from '../data/profile'

type Props = { autoFocus?: boolean; compact?: boolean }

/**
 * Command-line styled contact form. There is no backend: submitting composes a
 * pre-filled email in the visitor's mail client.
 */
export default function ContactTerminal({ autoFocus, compact }: Props) {
  const uid = useId()
  const [copied, setCopied] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setLog((l) => [...l, `> copied ${profile.email} to clipboard`])
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setLog((l) => [...l, '> clipboard unavailable — select the address above'])
    }
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const from = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = `Portfolio enquiry from ${name}`
    const body = `${message}\n\n— ${name}${from ? ` (${from})` : ''}`
    setLog((l) => [...l, '> composing message…', '> opening your mail client'])
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const label = 'w-[88px] shrink-0 font-mono text-[12.5px] text-subtle'

  return (
    <div className="border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-subtle">contact.sh</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Replies within 24h
        </span>
      </div>

      <div className={`font-mono text-[13px] ${compact ? 'p-4' : 'p-5 lg:p-6'}`}>
        <p className="text-subtle">
          $ <span className="text-fg">whoami</span>
        </p>
        <p className="mb-3 text-muted">visitor@rounak.sh</p>

        <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-subtle">
            $ <span className="text-fg">echo $EMAIL</span>
          </span>
          <span className="flex items-center gap-2">
            <a href={`mailto:${profile.email}`} className="break-all text-fg underline decoration-line underline-offset-4 hover:decoration-fg">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-7 items-center gap-1.5 border border-line px-2 text-[11px] uppercase tracking-wide text-muted transition-colors hover:border-strong hover:text-fg"
              aria-label="Copy email address"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </span>
        </div>

        <p className="mb-2 text-subtle">
          $ <span className="text-fg">mail --to rounak</span>
        </p>
        <form ref={formRef} onSubmit={submit} className="space-y-3">
          <div className="flex items-center gap-3">
            <label htmlFor={`${uid}-name`} className={label}>
              name:
            </label>
            <input id={`${uid}-name`} name="name" required autoComplete="name" autoFocus={autoFocus} className="field" placeholder="Ada Lovelace" />
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor={`${uid}-email`} className={label}>
              email:
            </label>
            <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" className="field" placeholder="ada@company.com" />
          </div>
          <div className="flex items-start gap-3">
            <label htmlFor={`${uid}-msg`} className={`${label} pt-2`}>
              message:
            </label>
            <textarea
              id={`${uid}-msg`}
              name="message"
              required
              rows={compact ? 4 : 3}
              className="field resize-none"
              placeholder="Let's talk about a role, a project, or an idea…"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) formRef.current?.requestSubmit()
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="btn-primary h-10">
              Send <CornerDownLeft size={14} />
            </button>
            <span className="text-[11.5px] text-subtle">Ctrl/⌘ + Enter to send</span>
          </div>
        </form>

        <div aria-live="polite" className="mt-4 space-y-0.5 text-[12px] text-subtle">
          {log.slice(-3).map((l, i) => (
            <p key={i}>{l}</p>
          ))}
          <p>
            <span className="text-fg">$</span>{' '}
            <span className="inline-block h-[1em] w-[7px] translate-y-[2px] animate-blink bg-fg" aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  )
}
