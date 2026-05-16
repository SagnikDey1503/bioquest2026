import { Pool } from "pg";
import { isAuthenticated } from "@/lib/admin-auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function ensureColumns() {
  await pool.query(`ALTER TABLE registrations ADD COLUMN IF NOT EXISTS admin_verified BOOLEAN NOT NULL DEFAULT FALSE`);
}

export async function GET() {
  if (!(await isAuthenticated()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  await ensureColumns();

  const { rows } = await pool.query(
    `SELECT id, first_name, middle_name, last_name, email, phone, grade,
            school, city, confirmed, admin_verified, created_at
     FROM registrations
     ORDER BY created_at DESC`
  );
  return Response.json(rows);
}
