"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Registration = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  phone: string;
  grade: string;
  school: string;
  city: string;
  confirmed: boolean;
  admin_verified: boolean;
  created_at: string;
};

export default function Dashboard() {
  const [regs, setRegs] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((r) => r.json())
      .then(setRegs)
      .finally(() => setLoading(false));
  }, []);

  async function toggleVerify(id: number) {
    const res = await fetch(`/api/admin/verify/${id}`, { method: "PATCH" });
    const { admin_verified } = await res.json();
    setRegs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, admin_verified } : r))
    );
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bq-green-dark text-white/60">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bq-green-dark px-4 py-8 sm:px-8">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-condensed text-3xl font-bold tracking-tight text-bq-cta">
            Admin Portal
          </h1>
          <p className="mt-0.5 text-sm text-white/50">
            BioQuest 2026 —{" "}
            <span className="text-white/80">{regs.length}</span>{" "}
            registration{regs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={logout}
          className="font-condensed shrink-0 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/60 transition hover:border-white/40 hover:text-white"
        >
          Logout
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm text-white">
          <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/50">
            <tr>
              {[
                "#", "Name", "Email", "Phone", "Class", "School", "City",
                "Student Confirmed", "Admin Verified", "Registered", "Photo", "Action",
              ].map((h) => (
                <th key={h} className="whitespace-nowrap px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {regs.map((r, i) => (
              <tr key={r.id} className="transition hover:bg-white/[0.03]">
                <td className="px-4 py-3 text-white/40">{i + 1}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {r.first_name}
                  {r.middle_name ? ` ${r.middle_name}` : ""} {r.last_name}
                </td>
                <td className="px-4 py-3 text-white/80">{r.email}</td>
                <td className="whitespace-nowrap px-4 py-3">{r.phone}</td>
                <td className="whitespace-nowrap px-4 py-3">{r.grade}</td>
                <td className="px-4 py-3">{r.school}</td>
                <td className="px-4 py-3">{r.city}</td>

                {/* Student confirmed checkbox */}
                <td className="px-4 py-3 text-center">
                  {r.confirmed ? (
                    <span className="text-bq-cta">✓</span>
                  ) : (
                    <span className="text-white/30">✗</span>
                  )}
                </td>

                {/* Admin verified indicator */}
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      r.admin_verified ? "bg-bq-cta" : "bg-white/20"
                    }`}
                  />
                </td>

                <td className="whitespace-nowrap px-4 py-3 text-xs text-white/40">
                  {new Date(r.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </td>

                {/* Photo link */}
                <td className="px-4 py-3">
                  <a
                    href={`/api/admin/photo/${r.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-condensed text-xs text-bq-cta underline-offset-2 hover:underline"
                  >
                    View
                  </a>
                </td>

                {/* Verify toggle */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleVerify(r.id)}
                    className={`font-condensed rounded px-3 py-1 text-xs font-bold transition ${
                      r.admin_verified
                        ? "bg-bq-cta/20 text-bq-cta hover:bg-bq-cta/30"
                        : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {r.admin_verified ? "Verified ✓" : "Verify"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {regs.length === 0 && (
          <p className="py-16 text-center text-sm text-white/30">
            No registrations yet.
          </p>
        )}
      </div>
    </div>
  );
}
