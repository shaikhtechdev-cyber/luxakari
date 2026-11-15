import { getServerSession, type Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { isAdminRole } from "@/lib/roles";

export { ADMIN_ROLES, isAdminRole } from "@/lib/roles";

/** For pages: the session if the viewer is an active admin, else null. */
export async function getAdminSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.status !== "Active" || !isAdminRole(session.user.type)) return null;
  return session;
}

/** For API routes: returns the admin session, or a 401/403 response to send back. */
export async function requireAdminApi(): Promise<{ session: Session } | { response: NextResponse }> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { response: NextResponse.json({ error: "Sign in required" }, { status: 401 }) };
  }
  if (session.user.status !== "Active" || !isAdminRole(session.user.type)) {
    return { response: NextResponse.json({ error: "Admin access only" }, { status: 403 }) };
  }
  return { session };
}
