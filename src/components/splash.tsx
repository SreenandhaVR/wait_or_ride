"use client";

import Link from "next/link";

/** A location pin, clock, and forward decision in one compact mark. */
function RideOrWaitMark() {
  return (
    <svg viewBox="0 0 80 100" className="h-[82px] w-[66px]" fill="none" aria-label="Ride or Wait logo" role="img">
      <path
        d="M40 92S10 57 10 37a30 30 0 1 1 60 0c0 20-30 55-30 55Z"
        stroke="#3B91F5"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="37" r="14" stroke="#3B91F5" strokeWidth="5" />
      <path d="M40 29v9l6 4" stroke="#3B91F5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m61 66 10-10m0 0v8m0-8h-8" stroke="#43E8C2" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RouteLine() {
  return (
    <svg viewBox="0 0 340 80" className="w-full" fill="none" aria-hidden="true">
      <path d="M12 51c44 2 69-5 105-27 30-18 68-6 102 1 44 9 74 11 109 32" stroke="#3B91F5" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="12" cy="51" r="6" fill="#C6A88A" stroke="#3B91F5" strokeWidth="3" />
      <circle cx="117" cy="24" r="6" fill="#C6A88A" stroke="#3B91F5" strokeWidth="3" />
      <circle cx="220" cy="24" r="6" fill="#C6A88A" stroke="#3B91F5" strokeWidth="3" />
      <circle cx="328" cy="57" r="6" fill="#C6A88A" stroke="#3B91F5" strokeWidth="3" />
      <circle cx="170" cy="24" r="5" fill="#43E8C2" />
    </svg>
  );
}

export function SplashScreen() {
  return (
    <main className="app-shell flex min-h-dvh flex-col bg-[#181b1c] px-4 pb-[18px] pt-[195px] text-center">
      <section className="animate-[fade-in_.5s_ease-out]">
        <RideOrWaitMark />
        <h1 className="mt-[39px] text-[36px] font-extrabold leading-none tracking-[-.055em] text-[#f7f3ee]">
          Ride or Wait
        </h1>
        <p className="mt-4 text-[17px] font-normal tracking-[-.035em] text-[#c6a88a]">Know Before You Board</p>
        <div className="mx-auto mt-[95px] w-full max-w-[340px]"><RouteLine /></div>
      </section>

      <Link
        href="/"
        className="mt-auto flex h-16 w-full items-center justify-center gap-3 rounded-[25px] bg-[#2050bb] text-[17px] font-bold text-white shadow-[0_8px_18px_rgba(0,0,0,.18)] transition hover:bg-[#2859c6]"
      >
        Get Started
        <span aria-hidden="true" className="text-[31px] font-normal leading-none">→</span>
      </Link>
    </main>
  );
}
