"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { vyttilaToKakkanadRoutes } from "../../lib/mockData";
import type { CrowdLevel } from "../../lib/types";

type CommunityReport = {
  id: string;
  mode: string;
  crowd: CrowdLevel;
  timestamp: string;
};

type CrowdStoreValue = {
  crowdByRouteId: Record<string, CrowdLevel>;
  reports: CommunityReport[];
  setCrowdLevel: (routeId: string, level: CrowdLevel, mode?: string) => void;
};

const STORAGE_KEY = "ride-or-wait-crowd-store";
const CrowdStoreContext = createContext<CrowdStoreValue | null>(null);

const initialCrowdByRouteId = Object.fromEntries(
  vyttilaToKakkanadRoutes.map((route) => [route.id, route.crowdLevel]),
) as Record<string, CrowdLevel>;

const initialReports: CommunityReport[] = [
  { id: "seed-metro", mode: "Metro", crowd: "low", timestamp: "1 minute ago" },
  { id: "seed-ksrtc", mode: "KSRTC Bus", crowd: "high", timestamp: "6 minutes ago" },
  { id: "seed-train", mode: "Train", crowd: "moderate", timestamp: "12 minutes ago" },
];

export function CrowdStoreProvider({ children }: { children: ReactNode }) {
  const [crowdByRouteId, setCrowdByRouteId] = useState(initialCrowdByRouteId);
  const [reports, setReports] = useState(initialReports);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<Pick<CrowdStoreValue, "crowdByRouteId" | "reports">>;
      if (parsed.crowdByRouteId) setCrowdByRouteId({ ...initialCrowdByRouteId, ...parsed.crowdByRouteId });
      if (parsed.reports) setReports(parsed.reports);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ crowdByRouteId, reports }));
  }, [crowdByRouteId, reports]);

  const value = useMemo<CrowdStoreValue>(() => ({
    crowdByRouteId,
    reports,
    setCrowdLevel: (routeId, level, mode = "Metro") => {
      setCrowdByRouteId((current) => ({ ...current, [routeId]: level }));
      setReports((current) => [
        { id: `${routeId}-${Date.now()}`, mode, crowd: level, timestamp: "just now" },
        ...current,
      ]);
    },
  }), [crowdByRouteId, reports]);

  return <CrowdStoreContext.Provider value={value}>{children}</CrowdStoreContext.Provider>;
}

export function useCrowdStore() {
  const context = useContext(CrowdStoreContext);
  if (!context) throw new Error("useCrowdStore must be used within CrowdStoreProvider.");
  return context;
}
