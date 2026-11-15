"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogIn, LogOut, UserRound } from "lucide-react";
import { isAdminRole } from "@/lib/roles";

/** Login link when signed out; name + sign-out when signed in. */
export default function AccountMenu({ variant = "desktop", onNavigate }: { variant?: "desktop" | "mobile"; onNavigate?: () => void }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return variant === "desktop" ? <span className="hidden h-9 w-24 sm:block" aria-hidden /> : null;
  }

  if (!session?.user) {
    const href = pathname && pathname !== "/login" ? `/login?callbackUrl=${encodeURIComponent(pathname)}` : "/login";
    return variant === "desktop" ? (
      <Link
        href={href}
        className="hidden items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-cream transition-colors hover:border-champagne hover:text-champagne sm:inline-flex"
      >
        <LogIn className="h-3.5 w-3.5" />
        Login
      </Link>
    ) : (
      <Link
        href={href}
        onClick={onNavigate}
        className="flex items-center gap-2 font-heading text-lg font-semibold tracking-[0.2em] text-cream"
      >
        <LogIn className="h-5 w-5" />
        Login
      </Link>
    );
  }

  const name = session.user.name || session.user.email || "Account";
  const firstName = name.split(" ")[0];

  return variant === "desktop" ? (
    <div className="hidden items-center gap-2 sm:flex">
      <span
        title={session.user.email ?? undefined}
        className="flex max-w-[160px] items-center gap-2 truncate font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne"
      >
        <UserRound className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{firstName}</span>
      </span>
      {isAdminRole(session.user.type) && (
        <Link
          href="/admin"
          title="Admin panel"
          className="flex items-center gap-1.5 rounded-full border border-cream/30 px-3 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-champagne hover:text-champagne"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Admin
        </Link>
      )}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        aria-label="Sign out"
        title="Sign out"
        className="rounded-full border border-cream/30 p-2.5 text-cream transition-colors hover:border-champagne hover:text-champagne"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2 font-body text-sm text-champagne">
        <UserRound className="h-4 w-4" />
        Signed in as {name}
      </span>
      {isAdminRole(session.user.type) && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className="flex items-center gap-2 self-start font-heading text-lg font-semibold tracking-[0.2em] text-cream"
        >
          <LayoutDashboard className="h-5 w-5" />
          Admin
        </Link>
      )}
      <button
        onClick={() => {
          onNavigate?.();
          signOut({ callbackUrl: "/" });
        }}
        className="flex items-center gap-2 self-start font-heading text-lg font-semibold tracking-[0.2em] text-cream"
      >
        <LogOut className="h-5 w-5" />
        Sign out
      </button>
    </div>
  );
}
