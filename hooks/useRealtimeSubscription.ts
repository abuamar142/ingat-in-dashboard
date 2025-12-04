"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { logger } from "@/utils/logger";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface UseRealtimeSubscriptionOptions {
  channelName: string;
  table: string;
  schema?: string;
  event?: "*" | "INSERT" | "UPDATE" | "DELETE";
  queryKeys: unknown[][];
  enabled?: boolean;
  onPayload?: (payload: any) => void;
}

export function useRealtimeSubscription({
  channelName,
  table,
  schema = "public",
  event = "*",
  queryKeys,
  enabled = true,
  onPayload,
}: UseRealtimeSubscriptionOptions) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    let channel: RealtimeChannel;

    const setupSubscription = async () => {
      channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes" as any,
          {
            event,
            schema,
            table,
          },
          (payload: any) => {
            logger.info(`[Realtime] ${table} changed:`, payload);

            // Call custom payload handler if provided
            if (onPayload) {
              onPayload(payload);
            }

            // Invalidate all specified query keys
            queryKeys.forEach((queryKey) => {
              queryClient.invalidateQueries({ queryKey });
            });
          }
        )
        .subscribe((status: string) => {
          if (status === "SUBSCRIBED") {
            logger.log(`[Realtime] Subscribed to ${channelName}`);
          } else if (status === "CHANNEL_ERROR") {
            logger.error(`[Realtime] Error subscribing to ${channelName}`);
          } else if (status === "TIMED_OUT") {
            logger.error(`[Realtime] Subscription to ${channelName} timed out`);
          }
        });
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
        logger.log(`[Realtime] Unsubscribed from ${channelName}`);
      }
    };
  }, [channelName, table, schema, event, enabled, queryClient, queryKeys, onPayload]);
}
