import { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; icon: string; title: string }> = {
  info: {
    bg: 'bg-blue-500/5',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    title: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-500/5',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-400',
    title: 'text-yellow-400',
  },
  success: {
    bg: 'bg-green-500/5',
    border: 'border-green-500/20',
    icon: 'text-green-400',
    title: 'text-green-400',
  },
  error: {
    bg: 'bg-red-500/5',
    border: 'border-red-500/20',
    icon: 'text-red-400',
    title: 'text-red-400',
  },
  tip: {
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    title: 'text-purple-400',
  },
};

const iconMap: Record<CalloutType, typeof Info> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
  tip: Lightbulb,
};

const defaultTitles: Record<CalloutType, string> = {
  info: 'Info',
  warning: 'Warning',
  success: 'Success',
  error: 'Error',
  tip: 'Tip',
};

/**
 * Callout component for highlighting important information
 */
export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = calloutStyles[type];
  const Icon = iconMap[type];
  const displayTitle = title || defaultTitles[type];

  return (
    <div
      className={cn(
        'my-6 rounded-xl border p-4',
        styles.bg,
        styles.border
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', styles.icon)} />
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <p className={cn('font-semibold mb-1', styles.title)}>
              {displayTitle}
            </p>
          )}
          <div className="text-text-secondary text-sm [&>p]:m-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Callout;

