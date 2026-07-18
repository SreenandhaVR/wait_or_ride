export type TransitMode = "Metro" | "KSRTC" | "Train" | "Bus";

export type CrowdLevel = "low" | "moderate" | "high";

export interface Route {
  id: string;
  mode: TransitMode;
  travelTimeMin: number;
  comfortScore: number;
  seatChance: number;
  costRupees: number;
  crowdLevel: CrowdLevel;
  weather: string;
}

export type Preference = "fastest" | "cheapest" | "comfortable" | "leastWalking";
