"use client";

import { useQuery } from "@tanstack/react-query";
import { getPendingLeaves } from "./api";
import { LEAVE_QUERY_KEYS } from "@/constants";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

/**
 * Leave query hooks
 */

export function usePendingLeaves() {
  useRealtimeSubscription({
    channelName: "leaves-changes",
    table: "user_leaves",
    queryKeys: [[...LEAVE_QUERY_KEYS.PENDING], [...LEAVE_QUERY_KEYS.ROOT]],
  });

  return useQuery({
    queryKey: LEAVE_QUERY_KEYS.PENDING,
    queryFn: getPendingLeaves,
    staleTime: Infinity,
  });
}
