/** Base URL of the Amanavest app, where accounts are created and managed. */
export const AMANAVEST_URL = (process.env.NEXT_PUBLIC_AMANAVEST_URL || "https://amanavest2-0.vercel.app").replace(
  /\/+$/,
  "",
);
