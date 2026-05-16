import Image from "next/image";
import Countdown from "./components/Countdown";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  // Target launch date for the countdown.
  const TARGET_DATE = "2026-07-03T00:00:00+05:30";

  return (
    <main id="home" className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Background — solid color with grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[#75d254]"
      />
      {/* White grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Overlay image starting from the top of the page */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[15vh] -z-[5] hidden xl:block">
        <Image
          src="/overlay.png"
          alt=""
          width={1920}
          height={1080}
          className="h-auto w-full"
        />
      </div>

      <Navbar />

      <section className="relative z-11 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-20 text-center sm:px-6 sm:pt-32">
        <div className="flex w-full items-end justify-center gap-3">
          <Image
            src="/bioquest-wordmark.png"
            alt="BIOQUEST"
            width={1290}
            height={329}
            priority
            className="h-auto w-[min(95vw,800px)] max-w-full xl:w-[min(50vw,800px)]"
          />
        </div>

        <p className="mt-4 max-w-full px-2 text-sm font-semibold text-white drop-shadow sm:px-4 sm:text-lg md:px-0 md:text-2xl lg:text-3xl">
          Science &amp; Innovation Quest for Young India
        </p>

        <a
          id="register"
          href="/register"
          style={{ cursor: 'pointer', userSelect: 'none' }}
          className="  font-condensed mt-8 inline-flex items-center justify-center rounded-full bg-bq-green-dark px-6 py-2.5 text-lg font-semibold leading-none tracking-tight text-bq-cta shadow-[0_0_30px_rgba(236,243,158,0.35)] ring-2 ring-bq-cta/40 hover:bg-bq-green-dark/90 hover:ring-bq-cta/70 transition cursor-pointer select-none sm:mt-10 sm:px-8 sm:py-3 sm:text-2xl md:px-12 md:py-4 md:text-[40px]"        >
          REGISTER
        </a>
      </section>

      {/* Kids playing illustration with countdown overlapping its bottom edge */}
      <div className="pointer-events-none relative z-10 -mt-[5vh] isolate sm:-mt-[20vh] md:-mt-[12vh] lg:-mt-[30vh] xl:-mt-[40vh]">
        {/* Overlay image behind kids-play (above bg, below the image) */}
        <Image
          src="/overlay.png"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none -z-10 object-cover"
          style={{ top: "10%" }}
        />
        <Image
          src="/kids-play.png"
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="pointer-events-none relative h-auto w-full"
          priority
        />
        {/* Countdown positioned so 50% overlaps the bottom edge of the image */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-1/3 px-4 sm:translate-y-1/2">
          <div className="mx-auto w-full max-w-3xl">
            <Countdown targetIso={TARGET_DATE} />
            <p className="mt-3 text-center text-sm text-white/90 drop-shadow">Registrations close on 3rd July 2026</p>
          </div>
        </div>
      </div>

      {/* Stats section with full team image as background */}
      <section className="relative isolate">
        {/* Full team image at natural aspect ratio — drives section height */}
        <Image
          src="/team.png"
          alt=""
          aria-hidden
          width={1920}
          height={1080}
          className="pointer-events-none h-auto w-full"
          priority
        />
        {/* Overlay covering the full image */}
        <Image
          src="/rec-overlay.png"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none object-cover"
        />

        {/* Stats overlaid on top, centered on the image */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-3 gap-5 text-left text-white sm:gap-8 sm:text-left">
              {[
                { value: "X+", label: "Registrations", desc: "description" },
                { value: "X+", label: "Round 1", desc: "description" },
                { value: "X+", label: "Round 2", desc: "description" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-condensed text-2xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                    {stat.value}
                  </span>
                  <div className="mt-2 h-px w-full bg-white/80" />
                  <span className="font-condensed mt-2 text-xs font-bold tracking-tight sm:mt-3 sm:text-xl md:text-2xl">
                    {stat.label}
                  </span>
                  <p className="font-condensed mt-1 text-[10px] text-white/80 sm:text-sm">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom banner — overlaps the bottom edge of the team image (50%) with glass effect */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/3 px-4 sm:translate-y-1/2 sm:px-6">
          <div className="mx-auto w-full max-w-5xl rounded-[20px] border-2 border-[#132A13] bg-[#ECF39E]/[0.57] px-4 py-5 text-center backdrop-blur-md sm:px-6">
            <p className="font-condensed text-sm font-bold tracking-tight text-[#132A13] sm:text-2xl md:text-3xl">
              Top 50 Students Get a Chance to Visit IIT Bombay
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
