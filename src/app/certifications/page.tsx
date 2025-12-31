import { Metadata } from 'next';
import Link from 'next/link';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Certifications',
  description: `Professional certifications of ${siteConfig.author.name} - Kubestronaut, AWS, Azure, GCP, and OCI certified.`,
};

/**
 * Certifications data
 */
const certifications = [
  {
    id: 'kubernetes',
    platform: 'Kubernetes / CNCF',
    title: 'Kubestronaut',
    description: 'Complete Kubernetes certification path - demonstrating comprehensive expertise in container orchestration, security, and cloud-native development.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/5',
    borderColor: 'border-blue-500/20',
    icon: '☸️',
    badges: [
      { name: 'CKA', fullName: 'Certified Kubernetes Administrator' },
      { name: 'CKS', fullName: 'Certified Kubernetes Security Specialist' },
      { name: 'CKAD', fullName: 'Certified Kubernetes Application Developer' },
      { name: 'KCSA', fullName: 'Kubernetes and Cloud Native Security Associate' },
      { name: 'KCNA', fullName: 'Kubernetes and Cloud Native Associate' },
    ],
    verifyUrl: 'https://www.cncf.io/certification/kubestronaut/',
  },
  {
    id: 'aws',
    platform: 'Amazon Web Services',
    title: 'AWS Certified (8x)',
    description: 'Comprehensive AWS certification portfolio covering architecture, development, operations, security, and specialty areas.',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-500/5',
    borderColor: 'border-orange-500/20',
    icon: '☁️',
    badges: [
      { name: 'Solutions Architect Professional', fullName: 'AWS Certified Solutions Architect - Professional' },
      { name: 'Solutions Architect Associate', fullName: 'AWS Certified Solutions Architect - Associate' },
      { name: 'DevOps Engineer Professional', fullName: 'AWS Certified DevOps Engineer - Professional' },
      { name: 'Security Specialty', fullName: 'AWS Certified Security - Specialty' },
      { name: 'Machine Learning Specialty', fullName: 'AWS Certified Machine Learning - Specialty' },
      { name: 'Big Data Specialty', fullName: 'AWS Certified Big Data - Specialty' },
      { name: 'SysOps Administrator', fullName: 'AWS Certified SysOps Administrator - Associate' },
      { name: 'Developer Associate', fullName: 'AWS Certified Developer - Associate' },
    ],
    verifyUrl: 'https://aws.amazon.com/certification/',
  },
  {
    id: 'azure',
    platform: 'Microsoft Azure',
    title: 'Azure Certified (2x)',
    description: 'Microsoft Azure certifications demonstrating expertise in cloud architecture and administration.',
    color: 'from-blue-600 to-blue-400',
    bgColor: 'bg-blue-600/5',
    borderColor: 'border-blue-600/20',
    icon: '🔷',
    badges: [
      { name: 'Solutions Architect Expert', fullName: 'Microsoft Certified: Azure Solutions Architect Expert' },
      { name: 'Administrator Associate', fullName: 'Microsoft Certified: Azure Administrator Associate' },
    ],
    verifyUrl: 'https://learn.microsoft.com/en-us/certifications/',
  },
  {
    id: 'gcp',
    platform: 'Google Cloud',
    title: 'GCP Certified (5x)',
    description: 'Google Cloud certifications spanning architecture, data engineering, DevOps, networking, and security.',
    color: 'from-green-500 to-blue-500',
    bgColor: 'bg-green-500/5',
    borderColor: 'border-green-500/20',
    icon: '🌐',
    badges: [
      { name: 'Professional Cloud Architect', fullName: 'Google Cloud Professional Cloud Architect' },
      { name: 'Professional Data Engineer', fullName: 'Google Cloud Professional Data Engineer' },
      { name: 'Professional DevOps Engineer', fullName: 'Google Cloud Professional DevOps Engineer' },
      { name: 'Professional Network Engineer', fullName: 'Google Cloud Professional Cloud Network Engineer' },
      { name: 'Professional Security Engineer', fullName: 'Google Cloud Professional Cloud Security Engineer' },
    ],
    verifyUrl: 'https://cloud.google.com/certification',
  },
  {
    id: 'oci',
    platform: 'Oracle Cloud',
    title: 'OCI Certified (3x)',
    description: 'Oracle Cloud Infrastructure certifications demonstrating expertise in architecture and database technologies.',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/5',
    borderColor: 'border-red-500/20',
    icon: '🔴',
    badges: [
      { name: 'Architect Professional', fullName: 'Oracle Cloud Infrastructure Architect Professional' },
      { name: 'Architect Associate', fullName: 'Oracle Cloud Infrastructure Architect Associate' },
      { name: 'Autonomous Database Specialist', fullName: 'Oracle Cloud Infrastructure Autonomous Database Specialist' },
    ],
    verifyUrl: 'https://education.oracle.com/oracle-certification-path',
  },
];

/**
 * Certifications page
 */
export default function CertificationsPage() {
  const totalCerts = certifications.reduce((acc, cert) => acc + cert.badges.length, 0);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-elevated border border-border mb-6">
            <Award className="w-5 h-5 text-accent-primary" />
            <span className="text-sm text-text-secondary">Professional Certifications</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Certifications
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {totalCerts}+ industry certifications across major cloud platforms and technologies.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`px-4 py-2 rounded-full ${cert.bgColor} border ${cert.borderColor}`}
              >
                <span className="mr-2">{cert.icon}</span>
                <span className="text-sm font-medium text-text-primary">
                  {cert.badges.length} {cert.platform.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Kubestronaut Highlight */}
        <section className="mb-12">
          <div className="relative p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="text-7xl">☸️</div>
              <div className="text-center md:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium mb-2">
                  CNCF / Linux Foundation
                </div>
                <h2 className="text-2xl font-display font-bold text-text-primary mb-2">
                  🎖️ Kubestronaut
                </h2>
                <p className="text-text-secondary mb-4 max-w-xl">
                  Achieved all 5 Kubernetes certifications from the Cloud Native Computing Foundation, 
                  demonstrating comprehensive expertise in container orchestration, security, and cloud-native technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  {certifications[0].badges.map((badge) => (
                    <span
                      key={badge.name}
                      className="px-3 py-1 text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                      title={badge.fullName}
                    >
                      {badge.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Certifications */}
        <section className="space-y-8">
          {certifications.slice(1).map((cert) => (
            <div
              key={cert.id}
              className={`p-6 rounded-xl ${cert.bgColor} border ${cert.borderColor}`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="text-5xl shrink-0">{cert.icon}</div>
                <div className="flex-1">
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${cert.color} text-white text-xs font-medium mb-2`}>
                    {cert.platform}
                  </div>
                  <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {cert.description}
                  </p>
                  <div className="space-y-2">
                    {cert.badges.map((badge) => (
                      <div
                        key={badge.name}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-text-secondary" title={badge.fullName}>
                          {badge.fullName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 text-text-muted hover:text-text-primary transition-colors"
                  title="Verify certification"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* Summary Card */}
        <section className="mt-16">
          <div className="p-8 rounded-2xl bg-bg-secondary border border-border text-center">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
              Certification Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-4 rounded-xl bg-bg-elevated border border-border">
                  <div className="text-3xl mb-2">{cert.icon}</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                    {cert.badges.length}
                  </div>
                  <div className="text-xs text-text-muted">{cert.platform.split(' ')[0]}</div>
                </div>
              ))}
            </div>
            <p className="text-text-secondary">
              Total: <span className="text-accent-primary font-bold">{totalCerts}</span> professional certifications
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <p className="text-text-muted mb-4">
            Want to learn more about my experience?
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-primary text-bg-primary font-medium hover:bg-accent-primary/90 transition-colors"
          >
            View Full Profile
          </Link>
        </section>
      </div>
    </div>
  );
}

