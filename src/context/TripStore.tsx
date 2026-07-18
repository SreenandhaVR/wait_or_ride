"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { vyttilaToKakkanadRoutes } from "../../lib/mockData";
import { scoreRoutes } from "../../lib/scoreRoutes";
import type { Preference, Route } from "../../lib/types";

export type TripScoreResult = { ranked: Route[]; winner: Route; explanation: string };

type TripStoreValue = {
  selectedPreference: Preference;
  lastResult: TripScoreResult;
  setTripRecommendation: (preference: Preference, result: TripScoreResult) => void;
};

const STORAGE_KEY = "ride-or-wait-trip-store";
const TripStoreContext = createContext<TripStoreValue | null>(null);
const initialResult = scoreRoutes(vyttilaToKakkanadRoutes, "comfortable");

export function TripStoreProvider({ children }: { children: ReactNode }) {
  const [selectedPreference, setSelectedPreference] = useState<Preference>("comfortable");
  const [lastResult, setLastResult] = useState<TripScoreResult>(initialResult);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<Pick<TripStoreValue, "selectedPreference" | "lastResult">>;
      if (parsed.selectedPreference) setSelectedPreference(parsed.selectedPreference);
      if (parsed.lastResult) setLastResult(parsed.lastResult);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedPreference, lastResult }));
  }, [selectedPreference, lastResult]);

  const value = useMemo<TripStoreValue>(() => ({
    selectedPreference,
    lastResult,
    setTripRecommendation: (preference, result) => {
      setSelectedPreference(preference);
      setLastResult(result);
    },
  }), [selectedPreference, lastResult]);

  return <TripStoreContext.Provider value={value}>{children}</TripStoreContext.Provider>;
}

export function useTripStore() {
  const context = useContext(TripStoreContext);
  if (!context) throw new Error("useTripStore must be used within TripStoreProvider.");
  return context;
}
