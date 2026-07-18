"use client";

import Link from "next/link";

function RideOrWaitMark() {
  return (
    <svg width="92" height="92" viewBox="0 0 64 64" fill="none" aria-label="Ride or Wait logo">
      <path d="M32 57s16-15.6 16-31A16 16 0 1 0 16 26c0 15.4 16 31 16 31Z" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 26.5h10M34 21.5l5 5-5 5" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27.5 38.5a5.5 5.5 0 1 0 9.7-3.55" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 35v3.5l2.3 1.4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MetroLineIllustration() {
  return (
    <svg className="w-full" viewBox="0 0 280 92" fill="none" aria-hidden="true">
      <path d="M9 63c34-31 66-31 99 0s62 31 97 0 48-30 66-18" stroke="#BFDBFE" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
      <circle cx="49" cy="30" r="10" fill="#2563EB" />
      <circle cx="139" cy="63" r="10" fill="#0EA5E9" />
      <circle cx="224" cy="27" r="10" fill="#2563EB" />
      <path d="M49 40v16m90-3v10m85-26v16" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SplashScreen() {
  return (
    <main className="app-shell flex min-h-screen flex-col items-center justify-between px-7 py-14 text-center">
      <div className="mt-14 animate-[fade-in_.5s_ease-out]">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-[28px] bg-blue-50">
          <RideOrWaitMark />
        </div>
        <h1 className="mt-6 text-[30px] font-extrabold tracking-tight text-ink">Ride or Wait</h1>
        <p className="mt-2 text-sm font-medium text-muted">Know Before You Board</p>
        <div className="mx-auto mt-12 w-64"><MetroLineIllustration /></div>
      </div>
      <div className="w-full animate-[fade-in_.7s_ease-out]">
        <p className="mb-5 text-sm leading-6 text-muted">A clearer choice for every commute.</p>
        <Link href="/" className="block w-full rounded-2xl bg-brand px-5 py-4 text-sm font-bold text-white shadow-[0_5px_12px_rgba(37,99,235,.22)]">Get Started</Link>
      </div>
    </main>
  );
}
