'use client';

import { useEffect, useRef } from 'react';
import { trackEngagementTime } from '@/lib/analytics';

export const useEngagementTracking = () => {
  const activeSinceRef = useRef<number>(Date.now());
  const totalEngagedRef = useRef<number>(0);

  useEffect(() => {
    const accumulateVisibleTime = () => {
      const now = Date.now();
      const chunk = now - activeSinceRef.current;
      if (chunk > 0) {
        totalEngagedRef.current += chunk;
      }
      activeSinceRef.current = now;
    };

    const flush = () => {
      accumulateVisibleTime();
      const toSend = totalEngagedRef.current;
      if (toSend >= 1000) {
        trackEngagementTime(toSend);
        totalEngagedRef.current = 0;
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flush();
      } else {
        activeSinceRef.current = Date.now();
      }
    };

    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        flush();
      }
    }, 30_000);

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', flush);

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
};
