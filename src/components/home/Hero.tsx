import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui';
import { siteConfig } from '@/lib/config';

/**
 * Hero section for homepage
 */
export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-elevated border border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-text-secondary">
                22+ Years in Infrastructure & Cloud
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight">
                Hi, I&apos;m{' '}
                <span className="gradient-text">Ashok</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
                IT Director & Solution Architect crafting enterprise-grade solutions in{' '}
                <span className="text-category-cloud">Cloud</span>,{' '}
                <span className="text-category-infra">Kubernetes</span>, and{' '}
                <span className="text-category-ai">AI/ML</span>.
              </p>
            </div>

            {/* Description */}
            <p className="text-text-muted leading-relaxed max-w-xl">
              Infrastructure and Digital Transformation leader with over 22+ years of experience 
              in designing, deploying, and operating critical systems for leading telecom providers 
              across APAC region. My expertise spans on-premises infrastructure operations, 
              hybrid-cloud architectures, and automation — all focused on improving reliability, 
              scalability, and cost efficiency.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                🎖️ Kubestronaut
              </span>
              <span className="px-3 py-1 text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">
                AWS Pro
              </span>
              <span className="px-3 py-1 text-xs bg-blue-600/10 text-blue-300 border border-blue-600/20 rounded-full">
                Azure Expert
              </span>
              <span className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                GCP Architect
              </span>
              <span className="px-3 py-1 text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">
                OCI Pro
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/blog">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Read the Blog
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  About Me
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-text-muted">Find me on</span>
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -inset-4 rounded-full border border-border/50 animate-pulse-slow" />
              <div className="absolute -inset-8 rounded-full border border-border/30" />
              <div className="absolute -inset-12 rounded-full border border-border/20" />
              
              {/* Profile Image */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-2 border-border shadow-2xl shadow-accent-primary/10">
                <img
                  src="/images/profile.jpg"
                  alt="Ashok Kumar Varma"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating tech badges */}
                <div className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-bg-elevated border border-border text-xs text-category-infra animate-bounce shadow-lg">
                  K8s
                </div>
                <div className="absolute top-1/4 -left-8 px-3 py-1 rounded-full bg-bg-elevated border border-border text-xs text-category-cloud animate-bounce animation-delay-200 shadow-lg">
                  AWS
                </div>
                <div className="absolute bottom-1/4 -right-6 px-3 py-1 rounded-full bg-bg-elevated border border-border text-xs text-category-ai animate-bounce animation-delay-400 shadow-lg">
                  AI/ML
                </div>
                <div className="absolute -bottom-2 left-1/4 px-3 py-1 rounded-full bg-bg-elevated border border-border text-xs text-category-database animate-bounce animation-delay-300 shadow-lg">
                  Oracle
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
