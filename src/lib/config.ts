import { CategoryMeta, NavItem, SiteConfig, TechItem } from '@/types';

/**
 * Site configuration
 */
export const siteConfig: SiteConfig = {
  name: 'AshokWorld',
  title: 'AshokWorld - Infrastructure, Cloud & AI Engineering',
  description:
    'Technology knowledge sharing platform by Ashok Kumar Varma. Deep dives into Cloud Architecture, Kubernetes, Infrastructure Automation, and AI/ML technologies.',
  url: 'https://ashokworld.dev',
  author: {
    name: 'Ashok Kumar Varma',
    email: 'ashok.dox@gmail.com',
    twitter: 'ashokvarma',
    github: 'ashokvarma',
    linkedin: 'ashok-kumar-varma-sagiraju-02337aa2',
  },
  links: {
    twitter: 'https://twitter.com/ashokvarma',
    github: 'https://github.com/ashokvarma',
    linkedin: 'https://linkedin.com/in/ashok-kumar-varma-sagiraju-02337aa2',
  },
};

/**
 * Navigation items
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Recommend', href: '/recommend' },
  { label: 'About', href: '/about' },
];

/**
 * Recommend sub-sections
 */
export const recommendSections = [
  {
    slug: 'books',
    name: 'Books',
    description: 'Recommended books with summaries and key takeaways',
    icon: 'book',
  },
  {
    slug: 'articles',
    name: 'Articles',
    description: 'Must-read articles and blog posts from around the web',
    icon: 'article',
  },
  {
    slug: 'videos',
    name: 'Videos',
    description: 'Educational videos, talks, and tutorials',
    icon: 'video',
  },
];

/**
 * Category metadata with icons
 */
export const categories: CategoryMeta[] = [
  {
    slug: 'ai',
    name: 'AI & ML',
    description: 'Artificial Intelligence, Machine Learning, and AI for IT Operations',
    color: 'category-ai',
  },
  {
    slug: 'cloud',
    name: 'Cloud',
    description: 'AWS, Azure, GCP, OCI - Multi-cloud architecture and solutions',
    color: 'category-cloud',
  },
  {
    slug: 'infra',
    name: 'Infrastructure',
    description: 'Kubernetes, DevSecOps, SRE, and platform engineering',
    color: 'category-infra',
  },
  {
    slug: 'database',
    name: 'Database',
    description: 'Oracle, TimesTen, data modeling, and performance tuning',
    color: 'category-database',
  },
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * Tech stack for homepage - Based on Ashok's expertise
 */
export const techStack: TechItem[] = [
  // Cloud Platforms
  { name: 'AWS', icon: 'aws', category: 'cloud' },
  { name: 'Azure', icon: 'azure', category: 'cloud' },
  { name: 'GCP', icon: 'gcp', category: 'cloud' },
  { name: 'OCI', icon: 'oci', category: 'cloud' },
  // Container & Orchestration
  { name: 'Kubernetes', icon: 'kubernetes', category: 'framework' },
  { name: 'Docker', icon: 'docker', category: 'framework' },
  { name: 'VMware', icon: 'vmware', category: 'framework' },
  // IaC & Automation
  { name: 'Terraform', icon: 'terraform', category: 'tool' },
  { name: 'Ansible', icon: 'ansible', category: 'tool' },
  // Observability
  { name: 'Prometheus', icon: 'prometheus', category: 'tool' },
  { name: 'Grafana', icon: 'grafana', category: 'tool' },
  { name: 'Elastic Stack', icon: 'elastic', category: 'tool' },
  // Databases
  { name: 'Oracle DB', icon: 'oracle', category: 'database' },
  { name: 'TimesTen', icon: 'timesten', category: 'database' },
  // Data & Streaming
  { name: 'Kafka', icon: 'kafka', category: 'database' },
  { name: 'Hadoop', icon: 'hadoop', category: 'database' },
  // OS & Languages
  { name: 'Linux', icon: 'linux', category: 'language' },
  { name: 'Python', icon: 'python', category: 'language' },
];

/**
 * Social links
 */
export const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: 'github',
  },
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: 'twitter',
  },
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: 'linkedin',
  },
];
