# ROUNAK.sh — Portfolio

Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + lucide-react.
Swiss-grid, engineering-first design with **Light (editorial)** and **Monochrome Dark** themes.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to /dist
npm run preview   # serve the production build
```

## Structure

```
src/
  data/profile.ts            # ALL content: bio, metrics, stack, projects, experience, links
  hooks/                     # useTheme, useActiveSection, useCountUp
  components/
    Header.tsx               # sticky nav, active-section underline, status chip, theme toggle
    Hero.tsx                 # statement, CTAs, count-up metric bar
    CodeInspector.tsx        # tabbed IDE card (json / go / python) with tiny syntax highlighter
    ExperienceTimeline.tsx
    Projects.tsx, ProjectCard.tsx, ProjectArt.tsx
    TechStack.tsx
    Contact.tsx, ContactTerminal.tsx, ContactDrawer.tsx
    Footer.tsx, SectionHeader.tsx, Reveal.tsx, BrandIcons.tsx
  index.css                  # design tokens (CSS variables) for both themes
```

## Before deploying

- Put your resume at `public/Rounak_Shrivastava_Resume.pdf`.
- In `src/data/profile.ts`, set each project's `repo` to its exact repository URL
  (they currently point at the GitHub profile) and add `demo` URLs where available —
  the "Live" button appears automatically when `demo` is set.
- The contact form has no backend: it opens the visitor's mail client with a pre-filled message.
