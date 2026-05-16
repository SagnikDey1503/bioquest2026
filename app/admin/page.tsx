import { cookies } from "next/headers";
import { expectedToken } from "@/lib/admin-auth";
import Dashboard from "./Dashboard";
import LoginForm from "./LoginForm";

export default async function AdminPage() {
  const store = await cookies();
  const isAuth = store.get("admin_session")?.value === expectedToken();
  return isAuth ? <Dashboard /> : <LoginForm />;
}
