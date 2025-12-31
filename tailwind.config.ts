import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          elevated: '#1a1a24',
          hover: '#22222e',
        },
        // Accent colors
        accent: {
          primary: '#00d4ff',
          secondary: '#7c3aed',
          pink: '#f472b6',
        },
        // Text colors
        text: {
          primary: '#f5f5f7',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        // Category colors
        category: {
          ai: '#f472b6',
          cloud: '#60a5fa',
          infra: '#34d399',
          database: '#fbbf24',
        },
        // Border colors
        border: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
        },
      },
      fontFamily: {
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#a1a1aa',
            '--tw-prose-headings': '#f5f5f7',
            '--tw-prose-lead': '#a1a1aa',
            '--tw-prose-links': '#00d4ff',
            '--tw-prose-bold': '#f5f5f7',
            '--tw-prose-counters': '#71717a',
            '--tw-prose-bullets': '#71717a',
            '--tw-prose-hr': '#27272a',
            '--tw-prose-quotes': '#f5f5f7',
            '--tw-prose-quote-borders': '#00d4ff',
            '--tw-prose-captions': '#71717a',
            '--tw-prose-code': '#f5f5f7',
            '--tw-prose-pre-code': '#f5f5f7',
            '--tw-prose-pre-bg': '#12121a',
            '--tw-prose-th-borders': '#27272a',
            '--tw-prose-td-borders': '#27272a',
            maxWidth: 'none',
            a: {
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderBottomColor: '#00d4ff',
              },
            },
            code: {
              backgroundColor: '#1a1a24',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#12121a',
              border: '1px solid #27272a',
              borderRadius: '0.75rem',
            },
            blockquote: {
              borderLeftWidth: '3px',
              fontStyle: 'normal',
            },
            h1: {
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
            h3: {
              fontWeight: '600',
            },
            img: {
              borderRadius: '0.75rem',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%2327272a'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

