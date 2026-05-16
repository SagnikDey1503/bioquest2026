import { Pool } from "pg";
import { isAuthenticated } from "@/lib/admin-auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

function detectMime(buf: Buffer): string {
  if (buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50) return "image/png";
  if (buf[0] === 0x47 && buf[1] === 0x49) return "image/gif";
  if (buf[0] === 0x52 && buf[1] === 0x49) return "image/webp";
  return "image/jpeg";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return new Response("Unauthorized", { status: 401 });

  const { id } = await params;
  const { rows } = await pool.query(
    "SELECT id_photo FROM registrations WHERE id = $1",
    [id]
  );

  if (!rows[0]?.id_photo)
    return new Response("Not found", { status: 404 });

  const buf = rows[0].id_photo as Buffer;
  return new Response(new Uint8Array(buf), {
    headers: { "Content-Type": detectMime(buf) },
  });
}
