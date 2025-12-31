import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui';
import { siteConfig } from '@/lib/config';

/**
 * Hero section for homepage - Mobile responsive
 */
export function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-[80vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent-secondary/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Mobile Profile Image - Shows on small screens */}
          <div className="flex lg:hidden justify-center mb-4">
            <div className="relative">
              {/* Profile Image */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-border shadow-xl">
                <img
                  src="/images/profile.jpg"
                  alt="Ashok Kumar Varma"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-full border border-border/50" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-bg-elevated border border-border text-xs sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-text-secondary">
                Infrastructure and Cloud Expert
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary leading-tight">
                Hi, I&apos;m{' '}
                <span className="gradient-text">Ashok</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed">
                IT Director & Solution Architect crafting enterprise-grade solutions in{' '}
                <span className="text-category-cloud">Cloud</span>,{' '}
                <span className="text-category-infra">Kubernetes</span>, and{' '}
                <span className="text-category-ai">AI/ML</span>.
              </p>
            </div>

            {/* Description - Hidden on very small screens */}
            <p className="hidden sm:block text-sm sm:text-base text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Infrastructure and Digital Transformation leader with over 22+ years of experience 
              in designing, deploying, and operating critical systems for leading telecom providers 
              across APAC region.
            </p>

            {/* Badges - Scrollable on mobile */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2">
              <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full whitespace-nowrap">
                🎖️ Kubestronaut
              </span>
              <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full whitespace-nowrap">
                AWS Pro
              </span>
              <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-blue-600/10 text-blue-300 border border-blue-600/20 rounded-full whitespace-nowrap">
                Azure Expert
              </span>
              <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-full whitespace-nowrap">
                GCP Architect
              </span>
              <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded-full whitespace-nowrap">
                OCI Pro
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link href="/blog" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Read the Blog
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  About Me
                </Button>
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 sm:pt-4">
              <span className="text-xs sm:text-sm text-text-muted">Find me on</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-elevated"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Desktop Profile Image with circular badges */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-56 h-56 xl:w-64 xl:h-64">
              {/* Decorative circles */}
              <div className="absolute -inset-8 rounded-full border border-border/50 animate-pulse-slow" />
              <div className="absolute -inset-16 rounded-full border border-border/30" />
              <div className="absolute -inset-24 rounded-full border border-border/20" />
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-border shadow-2xl shadow-accent-primary/10">
                <img
                  src="/images/profile.jpg"
                  alt="Ashok Kumar Varma"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating tech badges - circular arrangement */}
              {/* K8s - 0° (top) */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-category-infra/30 text-xs font-semibold text-category-infra shadow-lg shadow-category-infra/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(0deg) translateY(-170px) rotate(0deg)' }}
              >
                ⎈ K8s
              </div>
              
              {/* GCP - 60° */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-green-500/30 text-xs font-semibold text-green-400 shadow-lg shadow-green-500/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(60deg) translateY(-170px) rotate(-60deg)' }}
              >
                🌐 GCP
              </div>
              
              {/* AI/ML - 120° */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-category-ai/30 text-xs font-semibold text-category-ai shadow-lg shadow-category-ai/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(120deg) translateY(-170px) rotate(-120deg)' }}
              >
                🤖 AI/ML
              </div>
              
              {/* Database - 180° (bottom) */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-category-database/30 text-xs font-semibold text-category-database shadow-lg shadow-category-database/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(180deg) translateY(-170px) rotate(-180deg)' }}
              >
                🗄️ Database
              </div>
              
              {/* Azure - 240° */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-blue-400/30 text-xs font-semibold text-blue-400 shadow-lg shadow-blue-400/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(240deg) translateY(-170px) rotate(-240deg)' }}
              >
                🔷 Azure
              </div>
              
              {/* AWS - 300° */}
              <div 
                className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-full bg-bg-elevated/95 backdrop-blur-sm border border-category-cloud/30 text-xs font-semibold text-category-cloud shadow-lg shadow-category-cloud/20 hover:scale-110 transition-transform whitespace-nowrap"
                style={{ transform: 'translate(-50%, -50%) rotate(300deg) translateY(-170px) rotate(-300deg)' }}
              >
                ☁️ AWS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
