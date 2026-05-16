"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const GRADES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

const CONFIRMATIONS = [
  "I confirm I am currently studying in Class 9 or Class 10.",
  "I understand top performers may be invited to IIT Bombay.",
  "I agree to be contacted via WhatsApp or Email.",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "", middleName: "", lastName: "",
    email: "", phone: "", grade: "", school: "", city: "",
  });
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    setIdPhoto(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!confirmed) { setErrorMsg("Please accept all confirmation statements."); setStatus("error"); return; }
    if (!idPhoto)   { setErrorMsg("Please upload your ID card photo."); setStatus("error"); return; }

    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("idPhoto", idPhoto);
    fd.append("confirmed", "true");

    try {
      const res = await fetch("/api/register", { method: "POST", body: fd });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.detail ?? "Registration failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Could not connect to the server. Please try again later.");
      setStatus("error");
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Background — same as hero */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#75d254]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Navbar />

      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-32 sm:px-6">
        {status === "success" ? (
          <div className="w-full rounded-2xl border-2 border-bq-cta/40 bg-bq-green-dark px-8 py-12 text-center shadow-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bq-cta">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b3d1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-condensed text-3xl font-bold tracking-tight text-bq-cta">You&apos;re registered!</h2>
            <p className="mt-3 text-white/80">
              We&apos;ll reach out to you at <span className="text-bq-cta">{form.email}</span> with further details.
            </p>
          </div>
        ) : (
          <div className="w-full rounded-2xl border-2 border-bq-cta/30 bg-bq-green-dark px-6 py-8 shadow-xl sm:px-8">
            <h1 className="font-condensed text-3xl font-bold tracking-tight text-bq-cta sm:text-4xl">Register</h1>
            <p className="mt-1 text-sm text-white/60">BioQuest 2026 — Science &amp; Innovation Quest</p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">

              {/* Name row — three columns on md+ */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <Field label="First Name" name="firstName" type="text" value={form.firstName} onChange={handleChange} placeholder="Arjun" required />
                <Field label="Middle Name" name="middleName" type="text" value={form.middleName} onChange={handleChange} placeholder="Kumar (optional)" />
                <Field label="Last Name" name="lastName" type="text" value={form.lastName} onChange={handleChange} placeholder="Sharma" required />
              </div>

              {/* Two-column grid on md+ */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="arjun@example.com" required />
                <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />

                {/* Class dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-white/90">Class</label>
                  <select
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    required
                    className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white outline-none transition focus:border-bq-cta/60 focus:ring-1 focus:ring-bq-cta/40"
                  >
                    <option value="" disabled className="text-bq-green-dark">Select your class</option>
                    {GRADES.map((g) => (
                      <option key={g} value={g} className="text-bq-green-dark">{g}</option>
                    ))}
                  </select>
                </div>

                <Field label="School Name" name="school" type="text" value={form.school} onChange={handleChange} placeholder="Delhi Public School, Mumbai" required />
                <Field label="City" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Mumbai" required />

                {/* ID Card Photo */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-white/90">
                    ID Card Photo <span className="text-white/50 font-normal">(max 300 KB)</span>
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/30 bg-white/5 px-4 py-4 text-center transition hover:border-bq-cta/50 hover:bg-white/10">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      required
                      className="sr-only"
                    />
                    {idPhoto ? (
                      <span className="text-sm text-bq-cta">{idPhoto.name}</span>
                    ) : (
                      <>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-1 text-white/40">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-sm text-white/50">Click to upload image</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Confirmation */}
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-bq-cta"
                  />
                  <ul className="flex flex-col gap-1 text-sm text-white/80">
                    {CONFIRMATIONS.map((line) => (
                      <li key={line}>• {line}</li>
                    ))}
                  </ul>
                </label>
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="font-condensed mt-2 rounded-full bg-bq-cta px-8 py-3 text-xl font-bold tracking-tight text-bq-green-dark shadow-[0_0_20px_rgba(236,243,158,0.3)] ring-2 ring-bq-cta/40 transition hover:bg-bq-cta/90 disabled:opacity-60"
              >
                {status === "loading" ? "Submitting…" : "Register Now"}
              </button>
            </form>
          </div>
        )}
      </section>

    </main>
  );
}

function Field({
  label, name, type, value, onChange, placeholder, required,
}: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-white/90">{label}</label>
      <input
        name={name} type={type} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/40 outline-none transition focus:border-bq-cta/60 focus:ring-1 focus:ring-bq-cta/40"
      />
    </div>
  );
}
