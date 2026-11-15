"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { AMANAVEST_URL } from "@/lib/amanavest";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = safeCallback(params.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (!res || res.error) {
      setError(
        !res || res.error === "CredentialsSignin"
          ? "Incorrect email or password."
          : res.error,
      );
      return;
    }
    router.replace(callbackUrl);
    router.refresh();
  }

  return (
    <div className="glass-card w-full max-w-md rounded-none p-8 sm:p-10">
      <span className="section-label">Members</span>
      <h1 className="font-heading text-3xl font-semibold text-wine">Sign in</h1>
      <p className="mt-2 text-sm text-wine/70">
        Use your Amanavest account. The same email and password work on both sites.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-wine/80">Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-wine/80">
            Password
            <a
              href={`${AMANAVEST_URL}/forgot-password`}
              className="normal-case tracking-normal text-gold-dark hover:underline"
            >
              Forgot password?
            </a>
          </span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>

        {error && (
          <p role="alert" className="rounded-none border border-wine/20 bg-wine/5 px-4 py-3 text-sm text-wine">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-dark btn-shine w-full disabled:opacity-60">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
          {loading ? "Signing in" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-wine/70">
        No account yet?{" "}
        <a href={`${AMANAVEST_URL}/register`} className="font-semibold text-gold-dark hover:underline">
          Create one on Amanavest
        </a>
      </p>
    </div>
  );
}

/** Only allow redirects back into this site after login. */
function safeCallback(url: string | null): string {
  if (!url) return "/";
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const u = new URL(url);
    if (typeof window !== "undefined" && u.origin === window.location.origin) return u.pathname + u.search + u.hash;
  } catch {}
  return "/";
}
