# NeighbourLink

**Beyond walls, building bonds.**

[Live demo](https://neighbour-link-d6mo.vercel.app/)

NeighbourLink is a prototype for making it easier for neighbours to feel welcome and included. It brings open invitations and community information into a shared, friendly space—so nobody has to guess whether they belong.

## What’s inside

- **Open Door Board** — a digital noticeboard for community invitations, with sample cards and neighbour notes.
- **Mirror Page** — a read-only view of open invitations, with a larger-text accessibility option.
- **Season Card** — a seasonal calendar and community dates.
- **The Threshold** — an interactive doorstep-themed experience.
- **Brand & Story** — the project’s purpose and design language.
- **Small touches** — mobile navigation and an optional door chime.

The project is a front-end prototype. It uses sample data, and cards or notes added during a visit are held in app state only; they are not saved to a server or shared between visitors.

## Getting started

You’ll need [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/Pragun098/NeighbourLink.git
cd NeighbourLink
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Type-check and create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint. |

## Tech stack

- React and TypeScript
- Vite
- Tailwind CSS
- Lucide icons

## Project structure

```text
src/
  components/   UI grouped by experience
  data/         sample content
  types/        shared TypeScript types
  utils/        shared utilities, including the door chime
  App.tsx       app navigation and state
```

## Contributing

Contributions and suggestions are welcome. For larger changes, please open an issue first to discuss the proposed direction.
