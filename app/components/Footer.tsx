import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#igem", label: "iGEM IIT Bombay" },
  { href: "https://2024.igem.wiki/iit-bombay/", label: "Project 2024", external: true },
  { href: "https://2025.igem.wiki/iit-bombay/", label: "Project 2025", external: true },
  { href: "#bioquest2024", label: "BioQuest 2024" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact us" },
];

const faqItems = [
  {
    q: "General",
    a: "BioQuest is iGEM IIT Bombay's flagship science & innovation outreach quest for school students across India.",
  },
  {
    q: "Registration",
    a: "Registrations are free and open until 3rd July 2026. Click the Register button on the homepage to sign up.",
  },
  {
    q: "Eligibility",
    a: "Students currently in grades 8–12 from any school in India are eligible to participate.",
  },
  {
    q: "Schedule",
    a: "The event runs in two rounds. Round 1 is online; finalists are invited for Round 2 at IIT Bombay.",
  },
  {
    q: "Prizes",
    a: "Top performers win exciting prizes and the top 50 students get a chance to visit IIT Bombay.",
  },
  {
    q: "Support",
    a: "For any questions, reach us via the Contact section or email igem@iitb.ac.in.",
  },
];

const socials = [
  {
    href: "https://www.linkedin.com/company/igem-iit-bombay/posts/?feedView=all",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S0 4.881 0 3.5 1.11 1 2.5 1s2.48 1.119 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.46 4.46-2.46 4.77 0 5.65 3.14 5.65 7.22V24h-5v-7.1c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76V24h-5V8z"/>
      </svg>
    ),
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z"/>
      </svg>
    ),
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
      </svg>
    ),
  },
  {
    href: "https://www.instagram.com/igem_iitb/",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/@iGEM-IIT-Bombay",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    href: "https://behance.net",
    label: "Behance",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M7.443 5.35c.639 0 1.23.05 1.77.198.541.099 1.002.297 1.395.544.392.247.69.594.886 1.04.197.396.295.891.295 1.486 0 .643-.147 1.188-.443 1.585-.295.446-.738.792-1.327 1.04.788.247 1.378.643 1.722 1.188.394.594.59 1.287.59 2.080 0 .643-.098 1.188-.394 1.683-.246.495-.59.891-1.033 1.188-.443.297-.985.495-1.575.643-.59.099-1.18.197-1.82.197H0V5.35zm-.295 5.689c.541 0 .985-.099 1.328-.347.343-.247.492-.643.492-1.188 0-.297-.05-.594-.149-.792a1.115 1.115 0 00-.394-.495 1.692 1.692 0 00-.59-.247c-.246-.05-.492-.099-.738-.099H3v3.168zM6.853 16.96c.295 0 .59-.05.836-.099.246-.05.492-.149.69-.297.197-.148.394-.346.492-.594.099-.247.197-.594.197-.99 0-.792-.246-1.337-.689-1.683-.443-.297-1.082-.495-1.82-.495H3v4.158zm10.99-3.118c.444 0 .788-.149 1.181-.396.295-.247.443-.643.443-1.188h2.802c-.197 1.337-.689 2.327-1.477 2.871-.787.545-1.722.842-2.851.842-.788 0-1.475-.149-2.066-.396-.59-.247-1.13-.594-1.525-1.04-.394-.446-.738-.99-.935-1.633-.197-.594-.295-1.287-.295-1.98 0-.694.099-1.337.295-1.98a4.617 4.617 0 011.033-1.633c.443-.495.935-.842 1.575-1.089.59-.247 1.279-.396 2.066-.396.886 0 1.624.149 2.263.495.64.297 1.181.792 1.575 1.337.443.594.738 1.188.886 1.93.099.694.197 1.436.099 2.228h-6.853c0 .792.295 1.535.689 1.881.394.347.886.545 1.575.545zM19.32 8.812c-.394-.347-.985-.545-1.722-.545-.492 0-.886.099-1.181.247-.296.198-.591.396-.787.643a2.32 2.32 0 00-.345.842c-.05.296-.099.495-.099.693h4.231c-.05-.792-.345-1.534-.689-1.88zm-5.609-3.466h5.412V6.83h-5.412z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-bq-green-dark text-white">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-24 sm:pb-16 sm:pt-28">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-16">
          {/* Logo — hidden on mobile, shown from sm+ */}
          <div className="hidden sm:flex items-start justify-start">
            <Image
              src="/igem-iitb-logo1.png"
              alt="iGEM IIT Bombay"
              width={200}
              height={200}
              className="h-30 w-30 sm:h-35 sm:w-35 md:h-40 md:w-40 brightness-150"
            />
          </div>

          {/* FAQ — on mobile sits above Navigate (col 2, row 1); on sm+ moves to col 3 */}
          <div id="faq" className="flex flex-col items-start scroll-mt-24 sm:col-start-3 sm:row-start-1">
            <h3 className="font-condensed text-2xl font-bold tracking-tight text-bq-cta">FAQ</h3>
            <ul className="mt-4 w-full space-y-2">
              {faqItems.map((item, i) => (
                <li key={i}>
                  <details className="group">
                    <summary className="font-condensed cursor-pointer list-none text-base font-medium text-white transition-colors hover:text-bq-cta marker:hidden">
                      <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
                      {item.q}
                    </summary>
                    <p className="font-condensed mt-1 pl-4 text-sm text-white/80">{item.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate links — on mobile below FAQ; on sm+ in the middle column */}
          <div className="flex flex-col items-start sm:col-start-2 sm:row-start-1">
            <h3 className="font-condensed text-2xl font-bold tracking-tight text-bq-cta">NAVIGATE</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noreferrer noopener" : undefined}
                    className="font-condensed text-base font-medium text-white hover:text-bq-cta transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col-reverse items-center gap-6 border-t border-white/10 pt-6 sm:mt-16 sm:flex-row sm:justify-between">
          <div className="flex flex-row items-center gap-2 text-sm text-bq-cta sm:flex-row sm:gap-14">
            <span className="font-condensed">© All Rights Reserved</span>
            <Link href="#privacy" className="font-condensed hover:opacity-80">
              Privacy Policy
            </Link>
            <Link href="#terms" className="font-condensed hover:opacity-80">
              Terms and Conditions
            </Link>
          </div>

          <div className="flex items-center gap-4 text-bq-cta">
            {socials.map((s) => (
              
              <a  key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:opacity-80 transition-opacity"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}