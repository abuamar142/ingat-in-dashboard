"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, getCurrentSession, checkAuth } from "./api";
import { AUTH_QUERY_KEYS, AUTH_CACHE_CONFIG } from "@/constants";

/**
 * Authentication query hooks
 */

export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.USER,
    queryFn: getCurrentUser,
    staleTime: AUTH_CACHE_CONFIG.STALE_TIME,
  });
}

export function useCurrentSession() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.SESSION,
    queryFn: getCurrentSession,
    staleTime: AUTH_CACHE_CONFIG.STALE_TIME,
  });
}

export function useAuthStatus() {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.STATUS,
    queryFn: checkAuth,
    staleTime: AUTH_CACHE_CONFIG.STALE_TIME,
  });
}
