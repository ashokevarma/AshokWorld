# AshokWorld

Personal brand and technology knowledge platform by Ashok Kumar Varma.

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (Static Export) |
| Styling | Tailwind CSS |
| Content | MDX |
| Hosting | Cloudflare Pages |
| Language | TypeScript |

## 📁 Project Structure

```
├── content/
│   └── blog/              # MDX blog posts by category
│       ├── ai/
│       ├── cloud/
│       ├── database/
│       └── infra/
├── public/                # Static assets
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and config
│   └── types/            # TypeScript types
└── scripts/              # Build scripts
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## 📝 Adding Blog Posts

Create a new `.mdx` file in the appropriate category folder:

```
content/blog/{category}/{slug}.mdx
```

Example frontmatter:

```yaml
---
title: "Your Post Title"
description: "Brief description"
date: "2024-01-15"
category: "cloud"
tags: ["AWS", "Kubernetes"]
published: true
featured: false
---
```

## 🚀 Deployment

The site automatically deploys to Cloudflare Pages when you push to the `main` branch.

**Build Settings:**
- Build command: `npm run build`
- Output directory: `out`

## 📄 License

MIT
