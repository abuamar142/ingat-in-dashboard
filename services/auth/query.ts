"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getCurrentSession, checkAuth } from "./api";

// Get current user
export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get current session
export function useCurrentSession() {
  return useQuery({
    queryKey: ["auth", "session"],
    queryFn: getCurrentSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Check authentication status
export function useAuth() {
  return useQuery({
    queryKey: ["auth", "status"],
    queryFn: checkAuth,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
