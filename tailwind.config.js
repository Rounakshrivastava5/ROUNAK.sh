/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        code: token('code'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        strong: token('line-strong'),
        accent: token('accent'),
        'accent-fg': token('accent-fg'),
        signal: token('signal'),
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Archivo', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      maxWidth: {
        frame: '1440px',
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '0.6' }, '80%, 100%': { transform: 'scale(2.4)', opacity: '0' } },
      },
      animation: {
        blink: 'blink 1.1s steps(1) infinite',
        ping2: 'ping2 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
