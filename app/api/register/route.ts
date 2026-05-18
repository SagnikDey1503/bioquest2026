import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id          SERIAL PRIMARY KEY,
      first_name  TEXT NOT NULL,
      middle_name TEXT,
      last_name   TEXT NOT NULL,
      email       TEXT UNIQUE NOT NULL,
      phone       TEXT UNIQUE NOT NULL,
      grade       TEXT NOT NULL,
      school      TEXT NOT NULL,
      city        TEXT NOT NULL,
      id_photo    BYTEA,
      confirmed   BOOLEAN NOT NULL DEFAULT FALSE,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  // Migrate existing table if it was created without these columns
  const migrations = [
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS first_name  TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS middle_name TEXT`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS last_name   TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS id_photo    BYTEA`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS confirmed   BOOLEAN NOT NULL DEFAULT FALSE`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS school      TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS city        TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE registrations DROP COLUMN IF EXISTS name`,
    `ALTER TABLE registrations ADD COLUMN IF NOT EXISTS admin_verified BOOLEAN NOT NULL DEFAULT FALSE`,
  ];
  for (const sql of migrations) await pool.query(sql);
}

const VALID_GRADES = new Set(
  Array.from({ length: 7 }, (_, i) => `Class ${i + 6}`)
);

export async function POST(request: Request) {
  const fd = await request.formData();

  const firstName  = (fd.get("firstName")  as string | null)?.trim() ?? "";
  const middleName = (fd.get("middleName") as string | null)?.trim() || null;
  const lastName   = (fd.get("lastName")   as string | null)?.trim() ?? "";
  const email      = (fd.get("email")      as string | null)?.trim() ?? "";
  const phone      = (fd.get("phone")      as string | null) ?? "";
  const grade      = (fd.get("grade")      as string | null) ?? "";
  const school     = (fd.get("school")     as string | null)?.trim() ?? "";
  const city       = (fd.get("city")       as string | null)?.trim() ?? "";
  const confirmed  = fd.get("confirmed") === "true";

  if (firstName.length < 2)
    return Response.json({ detail: "First name must be at least 2 characters." }, { status: 400 });

  if (lastName.length < 2)
    return Response.json({ detail: "Last name must be at least 2 characters." }, { status: 400 });

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ detail: "Invalid email address." }, { status: 400 });

  const digits = phone.replace(/[\s-]/g, "");
  if (!/^\d{10}$/.test(digits))
    return Response.json({ detail: "Phone must be a 10-digit number." }, { status: 400 });

  if (!VALID_GRADES.has(grade))
    return Response.json({ detail: "Invalid class selected." }, { status: 400 });

  if (!school)
    return Response.json({ detail: "School name is required." }, { status: 400 });

  if (!city)
    return Response.json({ detail: "City is required." }, { status: 400 });

  if (!confirmed)
    return Response.json({ detail: "You must accept the confirmation." }, { status: 400 });

  try {
    await ensureTable();
    await pool.query(
      `INSERT INTO registrations
        (first_name, middle_name, last_name, email, phone, grade, school, city, confirmed)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [firstName, middleName, lastName, email.toLowerCase(), digits, grade, school, city, true]
    );
    return Response.json({ message: "Registered successfully" }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      if (msg.includes("email"))
        return Response.json({ detail: "This email is already registered." }, { status: 409 });
      return Response.json({ detail: "This phone number is already registered." }, { status: 409 });
    }
    console.error("Registration error:", err);
    return Response.json({ detail: "Something went wrong. Please try again." }, { status: 500 });
  }
}
