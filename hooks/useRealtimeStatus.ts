"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type RealtimeStatus = "connected" | "connecting" | "disconnected";

/**
 * Hook to monitor Supabase realtime connection status
 *
 * @returns Current connection status
 *
 * @example
 * const status = useRealtimeStatus();
 *
 * if (status === 'connected') {
 *   // Show green indicator
 * }
 */
export function useRealtimeStatus(): RealtimeStatus {
  const [status, setStatus] = useState<RealtimeStatus>("connecting");

  useEffect(() => {
    // Create a test channel to monitor connection status
    const channel = supabase.channel("status-monitor").subscribe((status) => {
      if (status === "SUBSCRIBED") {
        setStatus("connected");
      } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
        setStatus("disconnected");
      } else {
        setStatus("connecting");
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return status;
}
