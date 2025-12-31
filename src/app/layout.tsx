import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NewYearSplash } from '@/components/NewYearSplash';
import { siteConfig } from '@/lib/config';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'AI',
    'Machine Learning',
    'Cloud',
    'Infrastructure',
    'Database',
    'DevOps',
    'Software Engineering',
    'Technology Blog',
  ],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.author.twitter}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        <NewYearSplash>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16 md:pt-20">{children}</main>
            <Footer />
          </div>
        </NewYearSplash>
      </body>
    </html>
  );
}

