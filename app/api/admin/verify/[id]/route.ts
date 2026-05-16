import { Pool } from "pg";
import { isAuthenticated } from "@/lib/admin-auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { rows } = await pool.query(
    "UPDATE registrations SET admin_verified = NOT admin_verified WHERE id = $1 RETURNING admin_verified",
    [id]
  );

  return Response.json({ admin_verified: rows[0].admin_verified });
}
