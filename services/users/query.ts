"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/auth-provider";
import { getUsers, getUserById, getRecentActivity } from "./api";
import { USER_QUERY_KEYS, USER_CACHE_CONFIG } from "@/constants";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

/**
 * User query hooks
 */

export function useUsers() {
  const { user } = useAuth();

  useRealtimeSubscription({
    channelName: "users-changes",
    table: "users",
    queryKeys: [[...USER_QUERY_KEYS.ROOT], [...USER_QUERY_KEYS.RECENT_ACTIVITY]],
    enabled: !!user,
  });

  return useQuery({
    queryKey: USER_QUERY_KEYS.ROOT,
    queryFn: getUsers,
    staleTime: Infinity,
    enabled: !!user,
  });
}

export function useUser(id: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: USER_QUERY_KEYS.DETAIL(id),
    queryFn: () => getUserById(id),
    staleTime: USER_CACHE_CONFIG.STALE_TIME,
    enabled: !!id && !!user,
  });
}

export function useRecentActivity() {
  const { user } = useAuth();

  useRealtimeSubscription({
    channelName: "recent-activity-changes",
    table: "users",
    queryKeys: [[...USER_QUERY_KEYS.RECENT_ACTIVITY]],
    enabled: !!user,
  });

  return useQuery({
    queryKey: USER_QUERY_KEYS.RECENT_ACTIVITY,
    queryFn: getRecentActivity,
    staleTime: Infinity,
    enabled: !!user,
  });
}
