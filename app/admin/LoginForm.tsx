"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setError("Invalid username or password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bq-green-dark">
      <div className="w-full max-w-sm rounded-2xl border-2 border-bq-cta/30 px-8 py-10 shadow-xl">
        <h1 className="font-condensed text-2xl font-bold tracking-tight text-bq-cta">Admin Login</h1>
        <p className="mt-1 text-sm text-white/50">BioQuest 2026</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white/80">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
              required
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/30 outline-none transition focus:border-bq-cta/60 focus:ring-1 focus:ring-bq-cta/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white/80">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder-white/30 outline-none transition focus:border-bq-cta/60 focus:ring-1 focus:ring-bq-cta/40"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-condensed mt-2 rounded-full bg-bq-cta px-6 py-2.5 font-bold tracking-tight text-bq-green-dark transition hover:bg-bq-cta/90 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
