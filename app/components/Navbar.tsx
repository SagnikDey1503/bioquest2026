"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#bioquest1", label: "BioQuest 1" },
  { href: "https://www.igem-iitb.in/", label: "iGEM IITB" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link href="#home" className="flex items-center gap-2 cursor-default">
          <Image
            src="/igem-iitb-logo1.png"
            alt="iGEM IITB"
            width={64}
            height={64}
            className="h-14 w-14 brightness-75 contrast-125 sm:h-20 sm:w-20"
          />
        </Link>

        <ul className="font-condensed hidden items-center gap-8 text-xl font-bold tracking-tight text-white md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-bq-green-dark transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/register"
              className="font-condensed rounded-full bg-bq-green-dark px-5 py-2 text-xl font-bold tracking-tight text-bq-cta ring-2 ring-bq-cta/40 hover:bg-bq-green-dark/90 hover:ring-bq-cta/70 transition"
            >
              Register Now
            </Link>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center text-bq-navy outline-none focus:outline-none focus-visible:outline-none md:hidden"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="mx-4 mb-3 rounded-xl bg-bq-green-dark/95 px-4 py-3 text-white shadow-lg backdrop-blur md:hidden">
          <ul className="font-condensed flex flex-col gap-3 text-lg font-bold tracking-tight">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 hover:text-bq-cta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="font-condensed mt-1 inline-flex rounded-full bg-bq-green-dark px-5 py-2 font-bold tracking-tight text-bq-cta ring-2 ring-bq-cta/40"
              >
                Register Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
