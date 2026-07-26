export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const PORTFOLIO_SECTIONS = [
  'home',
  'sobre',
  'skills',
  'projetos',
  'contato',
] as const;

export type PortfolioSection = (typeof PORTFOLIO_SECTIONS)[number];

const canTrack = () =>
  typeof window !== 'undefined' && Boolean(window.gtag) && Boolean(GA_TRACKING_ID);

export const pageview = (url: string) => {
  if (!canTrack() || !GA_TRACKING_ID) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
  params,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  params?: Record<string, unknown>;
}) => {
  if (!canTrack()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  });
};

export const trackSectionView = (sectionId: PortfolioSection) => {
  event({
    action: 'section_view',
    category: 'engagement',
    label: sectionId,
    params: {
      section_id: sectionId,
    },
  });
};

export const trackSectionNav = (sectionId: string) => {
  event({
    action: 'section_nav_click',
    category: 'navigation',
    label: sectionId,
    params: {
      section_id: sectionId,
    },
  });
};

export const trackEngagementTime = (engagementTimeMsec: number) => {
  if (!canTrack() || engagementTimeMsec < 1000) return;

  window.gtag('event', 'user_engagement', {
    engagement_time_msec: Math.round(engagementTimeMsec),
  });
};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
