'use client';

import { Eye } from 'lucide-react';

interface ViewTrackerProps {
  slug: string;
  showCount?: boolean;
}

/**
 * View tracker placeholder
 * For analytics, use Cloudflare Web Analytics (free) or similar service
 * https://www.cloudflare.com/web-analytics/
 */
export function ViewTracker({ slug, showCount = true }: ViewTrackerProps) {
  // Static site - views tracked via Cloudflare Web Analytics
  // This component is a placeholder for future integration
  
  if (!showCount) {
    return null;
  }

  // Return null for now - views will be shown in Cloudflare Analytics dashboard
  return null;
}

export default ViewTracker;

