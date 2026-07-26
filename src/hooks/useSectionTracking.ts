'use client';

import { useEffect, useRef } from 'react';
import {
  PORTFOLIO_SECTIONS,
  PortfolioSection,
  trackSectionView,
} from '@/lib/analytics';

export const useSectionTracking = () => {
  const seenSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    PORTFOLIO_SECTIONS.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (seenSections.current.has(sectionId)) return;

            seenSections.current.add(sectionId);
            trackSectionView(sectionId as PortfolioSection);
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.35,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
};
