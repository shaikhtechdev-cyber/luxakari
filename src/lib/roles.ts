/** Amanavest account types allowed into the Luxakari admin panel.
 *  Same rule as Amanavest2.0 (lib/utils.ts → isAdminRole). Safe to import on the client. */
export const ADMIN_ROLES = ["Admin", "SuperAdmin", "Team"] as const;

export function isAdminRole(type?: string | null): boolean {
  return !!type && (ADMIN_ROLES as readonly string[]).includes(type);
}
