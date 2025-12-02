"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { SideBar } from "@/components/molecules/sideBar";
import { useAuth } from "@/components/providers/auth-provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, user } = useAuth();

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            {/* Spinning ring */}
            <div className="absolute h-32 w-32 animate-spin rounded-full border-2 border-primary/20 border-t-primary"></div>
            {/* Logo */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-white shadow-lg">
              <NextImage
                src="/logo.webp"
                alt="Ingat-in Logo"
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">Ingat-in</h3>
            <p className="text-sm text-muted-foreground animate-pulse">Verifying session...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading spinner while redirecting unauthenticated users
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render dashboard with sidebar for authenticated users
  return (
    <div className="flex min-h-screen bg-background relative">
      {/* Background */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="absolute left-1/4 top-20 -z-10 h-[600px] w-[600px] rounded-full bg-linear-to-br from-amber-200/30 to-orange-200/20 blur-[130px]" />
        <div className="absolute right-1/4 bottom-20 -z-10 h-[600px] w-[600px] rounded-full bg-linear-to-tl from-blue-200/25 to-indigo-200/20 blur-[130px]" />
      </div>

      <SideBar />
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8 lg:py-12 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
