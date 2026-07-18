import type { Preference, Route } from "./types";

type Weights = {
  comfort: number;
  seat: number;
  time: number;
  cost: number;
};

export type RouteScore = Route & { weightedScore: number };

const weightsByPreference: Record<Preference, Weights> = {
  comfortable: { comfort: 0.55, seat: 0.35, time: 0.05, cost: 0.05 },
  fastest: { comfort: 0.1, seat: 0.05, time: 0.75, cost: 0.1 },
  cheapest: { comfort: 0.1, seat: 0.05, time: 0.1, cost: 0.75 },
  // Walking distance is not available on Route yet, so this is a conservative
  // time-and-comfort proxy until a walkingMinutes field is added.
  leastWalking: { comfort: 0.35, seat: 0.2, time: 0.35, cost: 0.1 },
};

const normalizeLowerIsBetter = (value: number, lowest: number, highest: number) =>
  highest === lowest ? 100 : ((highest - value) / (highest - lowest)) * 100;

function explanationFor(winner: Route, runnerUp: Route, preference: Preference): string {
  const timeDifference = Math.abs(winner.travelTimeMin - runnerUp.travelTimeMin);
  const seatDifference = winner.seatChance - runnerUp.seatChance;
  const comfortDifference = winner.comfortScore - runnerUp.comfortScore;
  const costDifference = Math.abs(winner.costRupees - runnerUp.costRupees);

  if (preference === "fastest") {
    return timeDifference === 0
      ? `${winner.mode} matches ${runnerUp.mode}'s travel time and offers a better overall ride.`
      : `${winner.mode} is ${timeDifference} minutes faster than ${runnerUp.mode}.`;
  }

  if (preference === "cheapest") {
    return costDifference === 0
      ? `${winner.mode} matches ${runnerUp.mode}'s fare and offers a better overall ride.`
      : `${winner.mode} costs ₹${costDifference} less than ${runnerUp.mode}.`;
  }

  if (seatDifference > 0) {
    if (timeDifference) {
      const timeDirection = winner.travelTimeMin > runnerUp.travelTimeMin ? "longer" : "less";
      return `${winner.mode} takes ${timeDifference} minutes ${timeDirection} than ${runnerUp.mode} but offers a ${seatDifference}% higher chance of a seat.`;
    }
    return `${winner.mode} offers a ${seatDifference}% higher chance of a seat than ${runnerUp.mode}.`;
  }

  if (comfortDifference > 0) {
    return `${winner.mode} has a ${comfortDifference}-point higher comfort score than ${runnerUp.mode}.`;
  }

  return `${winner.mode} offers the strongest balance of comfort, seat availability, time, and cost.`;
}

/**
 * Ranks transit routes for one preference. Scores are normalized within the
 * supplied list, so it is deterministic and easy to test with fixture data.
 */
export function scoreRoutes(
  routes: Route[],
  preference: Preference,
): { ranked: Route[]; winner: Route; explanation: string } {
  if (routes.length === 0) {
    throw new Error("scoreRoutes requires at least one route.");
  }

  const scored = getRouteScores(routes, preference);
  const ranked = [...scored]
    .sort((a, b) => b.weightedScore - a.weightedScore)
    .map(({ weightedScore: _weightedScore, ...route }) => route);

  const winner = ranked[0];
  const runnerUp = ranked[1] ?? winner;

  return {
    ranked,
    winner,
    explanation: runnerUp === winner
      ? `${winner.mode} is the only available route.`
      : explanationFor(winner, runnerUp, preference),
  };
}

/** Returns the deterministic component scores, useful in tests and diagnostics. */
export function getRouteScores(routes: Route[], preference: Preference): RouteScore[] {
  if (routes.length === 0) {
    throw new Error("getRouteScores requires at least one route.");
  }

  const weights = weightsByPreference[preference];
  const times = routes.map((route) => route.travelTimeMin);
  const costs = routes.map((route) => route.costRupees);
  const lowestTime = Math.min(...times);
  const highestTime = Math.max(...times);
  const lowestCost = Math.min(...costs);
  const highestCost = Math.max(...costs);

  return routes.map((route) => ({
    ...route,
    weightedScore:
      route.comfortScore * weights.comfort +
      route.seatChance * weights.seat +
      normalizeLowerIsBetter(route.travelTimeMin, lowestTime, highestTime) * weights.time +
      normalizeLowerIsBetter(route.costRupees, lowestCost, highestCost) * weights.cost,
  }));
}
