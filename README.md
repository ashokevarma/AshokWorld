# AshokWorld

A hybrid personal brand + technology knowledge platform built with Next.js, TypeScript, and Tailwind CSS. Inspired by joshwcomeau.com.

![AshokWorld](https://via.placeholder.com/1200x630/0a0a0f/00d4ff?text=AshokWorld)

## Features

- 🚀 **Next.js 14** with App Router
- 📝 **MDX Blog** with syntax highlighting
- 🎨 **Tailwind CSS** with custom design system
- 🔐 **Admin Dashboard** protected by Cloudflare Access
- 📊 **Analytics** with Cloudflare D1
- ⚡ **Static Generation** for blazing fast performance
- 🌐 **Cloudflare Pages** deployment ready

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX |
| Database | Cloudflare D1 |
| ORM | Drizzle |
| Hosting | Cloudflare Pages |
| Auth | Cloudflare Access |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Wrangler CLI (for Cloudflare features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ashok-world.git
cd ashok-world

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Project Structure

```
AshokWorld/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Layout components
│   │   ├── blog/           # Blog components
│   │   ├── mdx/            # MDX components
│   │   └── home/           # Homepage components
│   ├── lib/                 # Utility libraries
│   └── types/               # TypeScript types
├── content/
│   └── blog/               # MDX blog posts
│       ├── ai/
│       ├── cloud/
│       ├── infra/
│       └── database/
├── db/
│   ├── schema.ts           # Drizzle schema
│   └── migrations/         # D1 migrations
├── public/                  # Static assets
└── wrangler.toml           # Cloudflare config
```

## Writing Blog Posts

Create a new MDX file in `content/blog/<category>/`:

```mdx
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-12-31"
category: "ai"  # ai | cloud | infra | database
tags: ["tag1", "tag2"]
image: "/images/blog/your-image.jpg"
published: true
featured: false
---

Your content here...
```

### Available MDX Components

```mdx
<Callout type="info" title="Info">
  Informational callout
</Callout>

<Callout type="warning">
  Warning callout
</Callout>

<Callout type="tip">
  Pro tip callout
</Callout>
```

## Deployment

### Cloudflare Pages

1. **Create D1 Database**:
   ```bash
   wrangler d1 create ashok-world-db
   ```

2. **Update `wrangler.toml`** with your database ID

3. **Run migrations**:
   ```bash
   wrangler d1 execute ashok-world-db --file=./db/migrations/0001_initial.sql
   ```

4. **Deploy**:
   ```bash
   npm run pages:deploy
   ```

### Cloudflare Access (Admin Protection)

1. Go to [Cloudflare Zero Trust](https://one.dash.cloudflare.com/)
2. Navigate to Access > Applications
3. Add a self-hosted application
4. Set path to `/admin/*`
5. Configure identity providers and access policies

## Configuration

### Site Configuration

Edit `src/lib/config.ts` to customize:

- Site name and description
- Author information
- Social links
- Navigation items
- Categories

### Styling

The design system is defined in `tailwind.config.ts`:

- Colors (background, accent, text, categories)
- Typography (fonts, sizes)
- Animations
- Custom utilities

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run pages:build` | Build for Cloudflare Pages |
| `npm run pages:preview` | Preview Cloudflare build locally |
| `npm run pages:deploy` | Deploy to Cloudflare Pages |
| `npm run db:migrate` | Run local D1 migrations |
| `npm run db:migrate:prod` | Run production D1 migrations |

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - feel free to use this for your own personal brand site!

## Acknowledgments

- Inspired by [joshwcomeau.com](https://joshwcomeau.com)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

