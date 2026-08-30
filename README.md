# alazlab.com

Göktuğ Turhan'ın kişisel portföyü ve proje arşivi. Site, Next.js App Router üzerinde çalışır ve her projeyi kendi detay, dokümantasyon, medya ve indirme kaynaklarıyla yayınlar.

## Project content model

Project metadata lives in `src/content/projects/*.md`. The Markdown body contains the human-readable project story, architecture, installation steps and usage guide. Optional structured resources are declared in frontmatter:

```yaml
downloads:
  - title: "Release package"
    href: "/projects/example/release.zip"
    description: "The latest verified release."
    version: "v1.0.0"
    format: "ZIP"
manuals:
  - title: "Installation guide"
    href: "/projects/example/installation.pdf"
    format: "PDF"
gallery:
  - src: "/projects/example/dashboard.png"
    alt: "Project dashboard"
    caption: "Main dashboard view."
videos:
  - title: "Product walkthrough"
    src: "https://www.youtube.com/watch?v=..."
    description: "A short overview of the main workflow."
```

The shared route at `/proje/[slug]` renders these sections only when real data exists. Local files belong under `public/projects/<slug>/`; YouTube and Vimeo embeds are supported through the allowlisted video URL parser. Legacy single-file `download` metadata remains supported for backwards compatibility.

### GT Launcher release history

`/tr/proje/GT-Launcher` and `/en/proje/GT-Launcher` fetch the public GT Launcher `CHANGELOG.md` on the server, cache it for one hour, and render parsed text-only release entries on alazlab.com. Visitors do not need to open GitHub, and source Markdown/HTML is never rendered directly in the browser.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
