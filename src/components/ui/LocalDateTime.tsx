'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * Local Date/Time component
 * Displays current date and time based on visitor's timezone
 */
export function LocalDateTime() {
  const [dateTime, setDateTime] = useState<{
    time: string;
    date: string;
    timezone: string;
  } | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Get formatted time (12-hour format with AM/PM)
      const time = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      
      // Get formatted date
      const date = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      
      // Get timezone city name
      const fullTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezone = fullTimezone.split('/').pop()?.replace(/_/g, ' ') || 'Local';

      setDateTime({ time, date, timezone });
    };

    // Update immediately
    updateDateTime();

    // Update every second for live clock
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!dateTime) {
    return (
      <div className="flex items-center gap-2 text-text-muted">
        <Clock className="w-4 h-4 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-bg-elevated/50 backdrop-blur-sm rounded-lg border border-border/30">
      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-primary flex-shrink-0" />
      <div className="text-right">
        <p className="text-xs sm:text-sm font-semibold text-text-primary tabular-nums">
          {dateTime.time}
        </p>
        <p className="text-[10px] sm:text-xs text-text-muted hidden sm:block">
          {dateTime.date}
        </p>
      </div>
    </div>
  );
}

export default LocalDateTime;
