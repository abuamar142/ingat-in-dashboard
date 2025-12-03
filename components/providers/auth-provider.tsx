"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { logger } from "@/utils/logger";

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);

        const isProtectedRoute = pathname.startsWith("/dashboard");

        if (!session && isProtectedRoute) {
          router.replace("/login");
        } else if (session && pathname === "/login") {
          router.replace("/dashboard");
        }
      } catch (error) {
        logger.error("Error checking session:", error);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);

      const isProtectedRoute = pathname.startsWith("/dashboard");

      if (!session && isProtectedRoute) {
        router.replace("/login");
      } else if (session && pathname === "/login") {
        router.replace("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, pathname]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
