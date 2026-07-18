import type { Route } from "./types";

/** Mock options for the Vyttila → Kakkanad leg. */
export const vyttilaToKakkanadRoutes: Route[] = [
  {
    id: "ksrtc-vyttila-kakkanad",
    mode: "KSRTC",
    travelTimeMin: 32,
    comfortScore: 32,
    seatChance: 18,
    costRupees: 30,
    crowdLevel: "high",
    weather: "Humid, 29°C",
  },
  {
    id: "metro-vyttila-kakkanad",
    mode: "Metro",
    travelTimeMin: 38,
    comfortScore: 94,
    seatChance: 91,
    costRupees: 40,
    crowdLevel: "low",
    weather: "Humid, 29°C",
  },
  {
    id: "train-vyttila-kakkanad",
    mode: "Train",
    travelTimeMin: 40,
    comfortScore: 81,
    seatChance: 75,
    costRupees: 25,
    crowdLevel: "moderate",
    weather: "Humid, 29°C",
  },
];
