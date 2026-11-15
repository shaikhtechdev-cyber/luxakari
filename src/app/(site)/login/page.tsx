import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in — Luxakari Hospitality Group",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center bg-cream px-4 pb-20 pt-32">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
