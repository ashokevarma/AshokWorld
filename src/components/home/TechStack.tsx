/**
 * Tech stack icons mapping
 */
const techIcons: Record<string, string> = {
  // Cloud
  aws: '☁️',
  azure: '🔷',
  gcp: '🌐',
  oci: '🔴',
  // Container & Orchestration
  kubernetes: '☸️',
  docker: '🐳',
  vmware: '💠',
  // IaC & Automation
  terraform: '🏗️',
  ansible: '⚙️',
  // Observability
  prometheus: '🔥',
  grafana: '📊',
  elastic: '🔍',
  // Databases
  oracle: '🗄️',
  timesten: '⚡',
  kafka: '📨',
  hadoop: '🐘',
  // OS & Languages
  linux: '🐧',
  python: '🐍',
};

/**
 * Tech stack data based on Ashok's expertise
 */
const techCategories = {
  cloud: {
    label: 'Cloud Platforms',
    items: [
      { name: 'AWS', icon: 'aws', certCount: 8 },
      { name: 'Azure', icon: 'azure', certCount: 2 },
      { name: 'GCP', icon: 'gcp', certCount: 5 },
      { name: 'OCI', icon: 'oci', certCount: 3 },
    ],
  },
  container: {
    label: 'Container & Orchestration',
    items: [
      { name: 'Kubernetes', icon: 'kubernetes', certCount: 5 },
      { name: 'Docker', icon: 'docker' },
      { name: 'VMware', icon: 'vmware' },
    ],
  },
  automation: {
    label: 'IaC & Automation',
    items: [
      { name: 'Terraform', icon: 'terraform' },
      { name: 'Ansible', icon: 'ansible' },
      { name: 'CI/CD', icon: 'ansible' },
    ],
  },
  observability: {
    label: 'Observability',
    items: [
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Grafana', icon: 'grafana' },
      { name: 'Elastic Stack', icon: 'elastic' },
    ],
  },
  database: {
    label: 'Data & Databases',
    items: [
      { name: 'Oracle DB', icon: 'oracle' },
      { name: 'TimesTen', icon: 'timesten' },
      { name: 'Kafka', icon: 'kafka' },
      { name: 'Hadoop', icon: 'hadoop' },
    ],
  },
  os: {
    label: 'OS & Languages',
    items: [
      { name: 'Linux', icon: 'linux' },
      { name: 'Python', icon: 'python' },
    ],
  },
};

/**
 * Tech stack section for homepage
 */
export function TechStack() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">
            Tech Stack & Expertise
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Technologies I work with to build scalable, reliable, and secure 
            enterprise infrastructure across multi-cloud environments.
          </p>
        </div>

        {/* Tech categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(techCategories).map(([key, { label, items }]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                {label}
              </h3>
              <div className="space-y-2">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary/50 border border-border/50 hover:border-border transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl" role="img" aria-label={tech.name}>
                        {techIcons[tech.icon] || '📦'}
                      </span>
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {tech.name}
                      </span>
                    </div>
                    {'certCount' in tech && tech.certCount && (
                      <span className="px-2 py-0.5 text-xs bg-accent-primary/10 text-accent-primary rounded-full">
                        {tech.certCount} certs
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certification summary */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-bg-secondary via-bg-elevated to-bg-secondary border border-border">
          <div className="text-center mb-8">
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              🎖️ Kubestronaut & Multi-Cloud Certified
            </h3>
            <p className="text-text-secondary text-sm">
              Comprehensive certifications across all major cloud platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Kubernetes', count: 5, color: 'from-blue-500 to-cyan-500' },
              { name: 'AWS', count: 8, color: 'from-orange-500 to-yellow-500' },
              { name: 'Azure', count: 2, color: 'from-blue-600 to-blue-400' },
              { name: 'GCP', count: 5, color: 'from-green-500 to-blue-500' },
              { name: 'OCI', count: 3, color: 'from-red-500 to-orange-500' },
            ].map((cert) => (
              <div
                key={cert.name}
                className="text-center p-4 rounded-xl bg-bg-primary/50 border border-border"
              >
                <div className={`text-2xl font-bold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                  {cert.count}
                </div>
                <div className="text-xs text-text-muted mt-1">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
