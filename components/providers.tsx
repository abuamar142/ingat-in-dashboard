"use client";

import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/components/auth-provider";
import { UsersRealtimeSync } from "@/components/users-realtime-sync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <UsersRealtimeSync />
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}
