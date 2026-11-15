"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 rounded-full border border-maroon-line px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:border-rosegold hover:text-rosegold"
    >
      <LogOut className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
}
