'use client';

import { useEffect } from 'react';

const SESSION_KEY = 'portfolio_visit_notified';

type NetworkInformationLike = {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
};

function getConnectionInfo() {
  const nav = navigator as Navigator & {
    connection?: NetworkInformationLike;
    mozConnection?: NetworkInformationLike;
    webkitConnection?: NetworkInformationLike;
  };
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!connection) return {};

  return {
    connectionType: connection.type,
    connectionEffectiveType: connection.effectiveType,
    connectionDownlink: connection.downlink,
    connectionRtt: connection.rtt,
    connectionSaveData: connection.saveData,
  };
}

function collectVisitPayload() {
  const nav = navigator as Navigator & { deviceMemory?: number };

  return {
    url: window.location.href,
    pathname: window.location.pathname,
    referrer: document.referrer || undefined,
    language: navigator.language,
    languages: Array.from(navigator.languages || []),
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    vendor: navigator.vendor,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    maxTouchPoints: navigator.maxTouchPoints,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenAvailWidth: window.screen.availWidth,
    screenAvailHeight: window.screen.availHeight,
    screenColorDepth: window.screen.colorDepth,
    screenPixelDepth: window.screen.pixelDepth,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    localTime: new Date().toLocaleString(),
    sessionId: crypto.randomUUID(),
    ...getConnectionInfo(),
  };
}

export const useVisitNotification = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, '1');

    const payload = collectVisitPayload();

    void fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      sessionStorage.removeItem(SESSION_KEY);
    });
  }, []);
};
