import { Metadata } from 'next';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, MapPin, Briefcase, GraduationCap, Award, Calendar } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.author.name} - Head of Infrastructure, IT Director, Senior Solution Architect & Kubestronaut with 22+ years of experience.`,
};

/**
 * Experience data
 */
const experiences = [
  {
    title: 'IT Director (Account Technologies Line Manager)',
    company: 'Amdocs',
    location: 'Jakarta, Indonesia',
    period: 'Aug 2023 – Present',
    highlights: [
      'Lead Infrastructure & IT operations for enterprise charging platforms across APAC region',
      'Oversee datacenter operations, capacity planning, vendor management for critical BSS workloads',
      'Drive automation initiatives and CI/CD adoption to streamline deployments',
      'Delivered 20% TCO reduction through infrastructure optimization and automation',
      'Launched GenAI-based initiatives to reduce incident restoration times',
    ],
  },
  {
    title: 'Senior Technical Architect',
    company: 'Amdocs',
    location: 'Jakarta, Indonesia',
    period: 'Nov 2019 – Jul 2023',
    highlights: [
      'Designed hybrid infrastructure solutions integrating on-premises with AWS, Azure, GCP, OCI',
      'Collaborated with customer architects to deliver BoM, HLAD and DAD documents',
      'Designed resilient and scalable architectures for global telecom customers',
      'Successfully migrated Oracle workloads to hybrid environments with near-zero downtime',
    ],
  },
  {
    title: 'Account Technologies Partner',
    company: 'Amdocs',
    location: 'Manila, Philippines',
    period: 'Nov 2015 – Nov 2019',
    highlights: [
      'Managed APAC infrastructure teams supporting production operations across region',
      'Drove transformation and automation initiatives aligning with client business goals',
      'Built regional CoE teams to support cross-accounts leveraging knowledge and expertise',
      'Enabled predictive monitoring and data visualization projects across multiple accounts',
    ],
  },
  {
    title: 'DB Specialist / Technologies Lead',
    company: 'Amdocs',
    location: 'Jakarta, Indonesia',
    period: 'Aug 2010 – Nov 2015',
    highlights: [
      'Designed, implemented and managed databases for enterprise BSS infrastructure',
      'Led and developed DBA team, mentoring new team members',
      'Implemented high-volume Oracle and TimesTen database clusters for millisecond latency',
    ],
  },
];

/**
 * Education data
 */
const education = [
  {
    degree: 'Artificial Intelligence for Managers',
    institution: 'IIM Bangalore',
    period: 'Apr 2022 – Aug 2023',
    current: false,
  },
  {
    degree: 'B.Tech',
    institution: 'JNTU Hyderabad',
    period: '1999 – 2003',
    current: false,
  },
];

/**
 * Core competencies
 */
const competencies = [
  'Infrastructure & Datacenter Strategy',
  'Leadership & Transformation',
  'Hybrid & Multi-Cloud Architecture',
  'High Availability & DR',
  'Infrastructure Automation',
  'DevSecOps',
  'SRE',
  'Capacity Planning',
  'Vendor Governance',
  'ITSM',
  'AI/ML for Ops',
  'Cost Optimization',
];

/**
 * Technical skills
 */
const technicalSkills = [
  { category: 'Cloud Platforms', skills: ['AWS', 'Azure', 'GCP', 'OCI'] },
  { category: 'Container & Orchestration', skills: ['Kubernetes', 'Docker', 'VMware'] },
  { category: 'IaC & Automation', skills: ['Terraform', 'Ansible', 'CI/CD'] },
  { category: 'Observability', skills: ['Prometheus', 'Grafana', 'Elastic Stack'] },
  { category: 'Databases', skills: ['Oracle DB', 'TimesTen', 'Kafka', 'Hadoop'] },
  { category: 'Operating Systems', skills: ['Linux', 'RHEL', 'Ubuntu'] },
];

/**
 * About page
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <header className="text-center mb-16">
          {/* Profile Photo */}
          <div className="relative inline-block mb-8">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-border shadow-xl shadow-accent-primary/10">
              <img
                src="/images/profile.jpg"
                alt="Ashok Kumar Varma"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-2 right-2 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-bg-primary" />
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3">
            {siteConfig.author.name}
          </h1>
          
          <p className="text-xl text-accent-primary mb-4">
            Head of Infrastructure | IT Director | Senior Solution Architect
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full text-blue-400">
              🎖️ Kubestronaut
            </span>
            <span className="px-3 py-1 text-sm bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-full text-orange-400">
              IIMB Alumni
            </span>
            <span className="px-3 py-1 text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400">
              22+ Years Experience
            </span>
          </div>

          {/* Quick info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted mb-8">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Jakarta, Indonesia
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              IT Director @ Amdocs
            </span>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="p-3 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-accent-primary rounded-full" />
            Executive Summary
          </h2>
          <div className="prose prose-lg max-w-none text-text-secondary space-y-4 bg-bg-secondary/50 rounded-xl p-6 border border-border">
            <p>
              Infrastructure & Digital Transformation leader with <strong className="text-text-primary">22+ years</strong> of 
              hands-on experience in designing, deploying, and operating mission-critical environments for leading 
              telecom providers across APAC.
            </p>
            <p>
              My expertise spans around on-premises datacenter operations, hybrid-cloud architectures, and end-to-end 
              automation with a focus on driving operational excellence and cost efficiency. I have led multi-country 
              teams across <strong className="text-text-primary">Indonesia, Malaysia, South Korea, and India</strong> for 
              delivering key transformation programs and operations for enterprise clients.
            </p>
            <p>
              Recognized for driving IT modernization, DevSecOps adoption, observability, and initiatives that 
              enhance reliability, scalability, and agility.
            </p>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-accent-primary rounded-full" />
            Core Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {competencies.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-text-secondary hover:border-accent-primary/50 hover:text-text-primary transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Certifications Preview */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-text-primary flex items-center gap-2">
              <Award className="w-6 h-6 text-accent-primary" />
              Certifications
            </h2>
            <Link
              href="/certifications"
              className="text-sm text-accent-primary hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Kubernetes', count: 5, icon: '☸️', color: 'from-blue-500 to-cyan-500' },
              { name: 'AWS', count: 8, icon: '☁️', color: 'from-orange-500 to-yellow-500' },
              { name: 'Azure', count: 2, icon: '🔷', color: 'from-blue-600 to-blue-400' },
              { name: 'GCP', count: 5, icon: '🌐', color: 'from-green-500 to-blue-500' },
              { name: 'OCI', count: 3, icon: '🔴', color: 'from-red-500 to-orange-500' },
            ].map((cert) => (
              <div
                key={cert.name}
                className="text-center p-4 rounded-xl bg-bg-secondary border border-border hover:border-border-hover transition-all"
              >
                <div className="text-2xl mb-2">{cert.icon}</div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                  {cert.count}
                </div>
                <div className="text-xs text-text-muted">{cert.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-accent-primary rounded-full" />
            Technical Expertise
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((group) => (
              <div key={group.category} className="p-4 rounded-xl bg-bg-secondary/50 border border-border">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-bg-elevated border border-border rounded-full text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-accent-primary" />
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-6 border-l-2 border-border hover:border-accent-primary transition-colors"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -ml-[7px] rounded-full bg-accent-primary" />
                <div className="pb-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-text-primary text-lg">{exp.title}</h3>
                    {index === 0 && (
                      <span className="px-2 py-0.5 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-accent-primary">{exp.company} – {exp.location}</p>
                  <p className="text-text-muted text-sm mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                        <span className="text-accent-primary mt-1">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            {/* Previous Roles */}
            <div className="mt-6 p-4 rounded-xl bg-bg-secondary/50 border border-border">
              <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
                Previous Roles
              </h4>
              <div className="space-y-2 text-sm text-text-secondary">
                <p>• Senior Oracle DBA – Amdocs India, Pune (Dec 2006 – Aug 2010)</p>
                <p>• Database Administrator – Patni Computer Systems, Mumbai (Sep 2005 – Nov 2006)</p>
                <p>• Software Engineer – Hyderabad (Jul 2003 – Aug 2005)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-accent-primary" />
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-bg-secondary border border-border"
              >
                <h3 className="font-semibold text-text-primary mb-1">{edu.degree}</h3>
                <p className="text-accent-primary text-sm mb-1">{edu.institution}</p>
                <p className="text-text-muted text-xs">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Achievements */}
        <section className="mb-16">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-accent-primary rounded-full" />
            Key Achievements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Led infrastructure and datacenter operations across APAC accounts, ensuring exceptional service reliability',
              'Partnered with sales and executive teams to shape RFP/RFI solutions, contributing to business growth',
              'Designed and implemented AI-driven observability and automation frameworks',
              'Advocated for DevSecOps, SRE, and modernization practices across enterprise systems',
              'Mentored geographically distributed teams to strengthen operational excellence',
              'Delivered 20% TCO reduction through infrastructure optimization and automations',
            ].map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-bg-secondary/50 border border-border"
              >
                <span className="text-accent-primary text-lg">✓</span>
                <p className="text-text-secondary text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-r from-accent-primary/10 via-bg-secondary to-accent-secondary/10 border border-border">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            I&apos;m always interested in discussing infrastructure modernization, cloud architecture, 
            or collaboration opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${siteConfig.author.email}`}>
              <Button leftIcon={<Mail className="w-4 h-4" />}>
                Get in Touch
              </Button>
            </a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" leftIcon={<Linkedin className="w-4 h-4" />}>
                Connect on LinkedIn
              </Button>
            </a>
            <Link href="/certifications">
              <Button variant="outline">
                View Certifications
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
