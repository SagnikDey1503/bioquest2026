"use client";

import { useEffect, useState } from "react";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: Array<[string, number]> = [
    ["Days", time.days],
    ["Hours", time.hours],
    ["Minutes", time.minutes],
    ["Seconds", time.seconds],
  ];

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[20px] border-2 border-[#132A13] bg-[#ECF39E]/[0.57] px-3 py-3 backdrop-blur-md sm:px-6 sm:py-5">
      <div className="grid grid-cols-4 gap-2 text-center sm:gap-4">
        {cells.map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <span
              className="font-inter text-xl font-normal text-[#132A13] tabular-nums tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
              suppressHydrationWarning
            >
              {mounted ? String(value).padStart(2, "0") : "--"}
            </span>
            <span className="font-inter mt-1 text-xs text-[#132A13] sm:text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
