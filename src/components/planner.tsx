"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { vyttilaToKakkanadRoutes } from "../../lib/mockData";
import { scoreRoutes } from "../../lib/scoreRoutes";
import type { Preference } from "../../lib/types";
import { BottomNav, Icon, PrimaryButton } from "./ui";

const preferences: Array<[string, Preference]> = [
  ["Fastest", "fastest"],
  ["Cheapest", "cheapest"],
  ["Comfortable", "comfortable"],
  ["Least Walking", "leastWalking"],
];

export function PlannerScreen() {
  const [destination, setDestination] = useState("");
  const [selectedPreference, setSelectedPreference] = useState<Preference>("comfortable");
  const router = useRouter();

  const findBestRoute = () => {
    scoreRoutes(vyttilaToKakkanadRoutes, selectedPreference);
    router.push("/recommendation");
  };

  return (
    <main className="app-shell">
      <div className="page">
        <header className="mb-9 flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-brand"><Icon>route</Icon></div><span className="text-base font-extrabold tracking-tight">Ride or Wait</span></div>
          <button className="rounded-xl bg-surface p-2.5"><Icon className="text-xl">notifications</Icon></button>
        </header>
        <h1 className="text-[28px] font-extrabold tracking-tight">Plan your trip</h1>
        <p className="mt-1 text-sm text-muted">Choose a route that feels right today.</p>
        <div className="mt-7 space-y-3">
          <div className="field"><Icon className="text-brand">my_location</Icon><span><span className="label mb-1 block">From</span>Current Location</span></div>
          <div className="ml-6 h-2 border-l-2 border-dashed border-slate-200" />
          <label className="field cursor-text"><Icon className="text-sky">location_on</Icon><span className="flex-1"><span className="label mb-1 block">To</span><input aria-label="Search destination" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Search Destination" className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-muted" /></span><Icon className="text-muted">search</Icon></label>
        </div>
        <section className="mt-7">
          <span className="label">Travel preference</span>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {preferences.map(([label, preference]) => <button onClick={() => setSelectedPreference(preference)} key={preference} className={`rounded-xl border px-3 py-3 text-xs font-semibold ${selectedPreference === preference ? "border-brand bg-blue-50 text-brand" : "border-line text-muted"}`}>{label}</button>)}
          </div>
        </section>
        <div className="mt-7"><PrimaryButton onClick={findBestRoute}>Find Best Route</PrimaryButton></div>
        <section className="mt-10"><h2 className="text-base font-bold">Recent searches</h2><div className="mt-3 divide-y divide-line">{["Vyttila → Kakkanad", "Aluva → Edappally"].map((item) => <Link href="/recommendation" key={item} className="flex items-center gap-3 py-4 text-sm font-medium"><Icon className="text-muted">history</Icon>{item}<Icon className="ml-auto text-muted">chevron_right</Icon></Link>)}</div></section>
      </div>
      <BottomNav active="journey" />
    </main>
  );
}
