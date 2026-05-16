import { cookies } from "next/headers";
import { expectedToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return Response.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const store = await cookies();
  store.set("admin_session", expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return Response.json({ ok: true });
}
