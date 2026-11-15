import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ExternalLink, ShieldAlert } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { isAdminRole } from "@/lib/admin";
import { media } from "@/lib/media";
import SignOutButton from "@/components/admin/SignOutButton";

export const metadata: Metadata = {
  title: "Admin — Luxakari Hospitality Group",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");

  const allowed = session.user.status === "Active" && isAdminRole(session.user.type);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header band — Deep Maroon, logo + context, per brand §07 */}
      <header className="bg-maroon text-cream">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src={media("/images/logo-emblem.png")} alt="" width={248} height={525} className="h-10 w-auto" priority />
            <span className="font-heading text-base font-medium tracking-[0.3em] text-rosegold sm:text-lg">LUXAKARI</span>
            <span className="hidden border-l border-maroon-line pl-3 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-sand sm:inline">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden text-right md:block">
              <span className="block text-sm text-cream">{session.user.name}</span>
              <span className="block font-display text-[10px] uppercase tracking-[0.25em] text-sand/80">{session.user.type}</span>
            </span>
            <Link
              href="/"
              className="hidden items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-sand transition-colors hover:text-rosegold sm:flex"
            >
              View site <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      {allowed ? (
        <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">{children}</main>
      ) : (
        <main className="mx-auto flex max-w-xl flex-col items-start px-4 py-20 sm:px-6">
          <ShieldAlert className="h-8 w-8 text-dustyrose" />
          <span className="section-label mt-6">Restricted</span>
          <h1 className="font-heading text-3xl text-maroon-ink">Admin access only</h1>
          <div className="divider-gold mt-5 w-20" />
          <p className="mt-6 text-warmbrown">
            You&apos;re signed in as {session.user.email}, which isn&apos;t an Amanavest Admin or Team account. Ask an
            administrator to change your account type, or sign in with a different account.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/" className="btn-dark">
              Back to site
            </Link>
          </div>
        </main>
      )}

      <footer className="border-t border-maroon/10">
        <div className="mx-auto flex max-w-[1400px] justify-between px-4 py-5 font-display text-[10px] uppercase tracking-[0.3em] text-taupe sm:px-6 lg:px-10">
          <span>Luxakari · Admin</span>
          <span>Confidential</span>
        </div>
      </footer>
    </div>
  );
}
