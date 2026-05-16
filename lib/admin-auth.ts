import { createHmac } from "crypto";
import { cookies } from "next/headers";

export function expectedToken(): string {
  const u = process.env.ADMIN_USERNAME ?? "";
  const p = process.env.ADMIN_PASSWORD ?? "";
  const s = process.env.ADMIN_SECRET ?? "bioquest-admin-secret";
  return createHmac("sha256", s).update(`${u}:${p}`).digest("hex");
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get("admin_session")?.value === expectedToken();
}
