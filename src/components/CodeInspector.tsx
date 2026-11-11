import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Terminal } from 'lucide-react'

type FileDef = { name: string; lang: string; prompt: string; code: string }

const FILES: FileDef[] = [
  {
    name: 'system_inspector.json',
    lang: 'JSON',
    prompt: '$ cat rounak_shrivastava.json',
    code: `{
  "role": "Senior Software Engineer",
  "company": "Reqpedia Technologies",
  "experience": "4+ years (Enterprise & AI)",
  "stack": {
    "frontend": ["React", "Angular", "RxJS"],
    "backend": ["Go", "FastAPI", "Node.js"],
    "cloud": ["AWS Lambda", "API Gateway", "S3"]
  },
  "metrics": {
    "features_shipped": 40,
    "enterprise_users": "10K+",
    "perf_gain": "+30%"
  },
  "status": "available"
}`,
  },
  {
    name: 'portfolio.go',
    lang: 'Go',
    prompt: '$ go run portfolio.go',
    code: `package main

import "fmt"

func main() {
    engineer := Developer{
        Name:    "Rounak Shrivastava",
        Role:    "Full Stack & Gen AI Engineer",
        Skills:  []string{"React", "Angular", "Go", "Python", "AWS"},
        Mission: "Building scalable AI-driven web apps.",
    }
    engineer.Deploy()
    fmt.Println("status: online")
}`,
  },
  {
    name: 'ai_service.py',
    lang: 'Python',
    prompt: '$ uvicorn ai_service:app',
    code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="rounak.ai")

class Query(BaseModel):
    prompt: str
    model: str = "claude"

# async LLM gateway with context preservation
@app.post("/v1/complete")
async def complete(q: Query) -> dict:
    ctx = await context_store.load(q.prompt)
    return await llm.generate(q.model, ctx)`,
  },
]

// --- Tiny tokenizer: enough for the three snippets above. ---
type Tok = { t: 'comment' | 'string' | 'key' | 'number' | 'keyword' | 'fn' | 'ident' | 'punct' | 'space'; v: string }

const KEYWORDS = new Set([
  'package', 'import', 'func', 'return', 'from', 'class', 'def', 'async', 'await', 'true', 'false', 'None', 'string',
])

function tokenize(line: string): Tok[] {
  const out: Tok[] = []
  let s = line
  while (s.length) {
    let m: RegExpMatchArray | null
    if ((m = s.match(/^(\/\/.*|#.*)/))) out.push({ t: 'comment', v: m[0] })
    else if ((m = s.match(/^"(?:[^"\\]|\\.)*"/))) {
      const isKey = /^\s*:/.test(s.slice(m[0].length))
      out.push({ t: isKey ? 'key' : 'string', v: m[0] })
    } else if ((m = s.match(/^\d+(\.\d+)?/))) out.push({ t: 'number', v: m[0] })
    else if ((m = s.match(/^@?[A-Za-z_][\w.]*/))) {
      const word = m[0]
      const next = s.slice(word.length)
      if (KEYWORDS.has(word)) out.push({ t: 'keyword', v: word })
      else if (next.startsWith('(') || word.startsWith('@')) out.push({ t: 'fn', v: word })
      else out.push({ t: 'ident', v: word })
    } else if ((m = s.match(/^\s+/))) out.push({ t: 'space', v: m[0] })
    else out.push({ t: 'punct', v: (m = s.match(/^./))![0] })
    s = s.slice(m![0].length)
  }
  return out
}

const COLOR: Record<Tok['t'], string> = {
  comment: 'rgb(var(--syn-comment))',
  string: 'rgb(var(--syn-string))',
  key: 'rgb(var(--syn-key))',
  number: 'rgb(var(--syn-number))',
  keyword: 'rgb(var(--syn-keyword))',
  fn: 'rgb(var(--syn-fn))',
  ident: 'rgb(var(--fg))',
  punct: 'rgb(var(--syn-punct))',
  space: 'inherit',
}

export default function CodeInspector() {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const file = FILES[active]
  const lines = useMemo(() => file.code.split('\n').map(tokenize), [file])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(file.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex h-full flex-col overflow-hidden border border-line bg-code shadow-[0_1px_0_rgb(var(--line)),0_24px_48px_-32px_rgb(15_23_42/0.35)] dark:shadow-none">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-[#FF5F57] dark:bg-neutral-600" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-[#FEBC2E] dark:bg-neutral-600" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-[#28C840] dark:bg-neutral-600" />
          </div>
          <span className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-subtle">System_Inspector_v4.1</span>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-7 items-center gap-1.5 px-2 font-mono text-[11px] uppercase tracking-wide text-subtle transition-colors hover:text-fg"
              aria-label={`Copy ${file.name}`}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label="Inspector files" className="flex overflow-x-auto border-b border-line">
          {FILES.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls="inspector-panel"
              onClick={() => setActive(i)}
              className={`relative shrink-0 border-r border-line px-3.5 py-2 font-mono text-[12px] transition-colors ${
                i === active ? 'text-fg' : 'text-subtle hover:text-fg'
              }`}
            >
              {i === active && (
                <motion.span layoutId="inspector-tab" className="absolute inset-0 bg-surface" aria-hidden="true" />
              )}
              {i === active && (
                <motion.span layoutId="inspector-tab-bar" className="absolute inset-x-0 top-0 h-[2px] bg-accent" aria-hidden="true" />
              )}
              <span className="relative">{f.name}</span>
            </button>
          ))}
        </div>

        {/* Code */}
        <div id="inspector-panel" role="tabpanel" className="relative flex-1 overflow-x-auto bg-surface py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={file.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <div className="mb-2 flex items-center gap-2 px-4 font-mono text-[12.5px] text-subtle">
                <Terminal size={13} /> {file.prompt}
              </div>
              <pre className="font-mono text-[12.5px] leading-[1.7] sm:text-[13px]" onMouseLeave={() => setHover(null)}>
                <code>
                  {lines.map((toks, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHover(i)}
                      className={`flex pr-4 transition-colors ${hover === i ? 'bg-fg/[0.04]' : ''}`}
                    >
                      <span className="w-10 shrink-0 select-none pr-3 text-right text-subtle/60 tabular-nums">{i + 1}</span>
                      <span className="whitespace-pre">
                        {toks.map((tk, j) => (
                          <span key={j} style={{ color: COLOR[tk.t], fontStyle: tk.t === 'comment' ? 'italic' : undefined }}>
                            {tk.v}
                          </span>
                        ))}
                        {i === lines.length - 1 && (
                          <span className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-blink bg-fg" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 border-t border-line px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
          <span className="flex items-center gap-1.5 text-fg">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Live
          </span>
          <span>{file.lang}</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="ml-auto tabular-nums">
            Ln {hover !== null ? hover + 1 : lines.length}, Col 1
          </span>
        </div>
      </div>

      {/* Floating agent chip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="absolute bottom-10 right-4 hidden w-[250px] border border-line bg-surface shadow-[0_16px_32px_-20px_rgb(15_23_42/0.4)] dark:shadow-none xl:block"
      >
        <div className="flex items-center gap-3 border-b border-line px-3 py-2.5">
          <span className="grid h-7 w-7 place-items-center border border-line font-mono text-[11px] font-semibold">AI</span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold">AI Context Shifter</div>
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-subtle">Chrome extension</div>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 py-2 text-[12.5px]">
          <span className="text-muted">Gen AI agent online</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping2 rounded-full bg-signal" />
            <span className="relative h-2 w-2 rounded-full bg-signal" />
          </span>
        </div>
      </motion.div>
    </div>
  )
}
