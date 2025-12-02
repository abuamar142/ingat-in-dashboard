/**
 * Authentication Constants
 */

// Query Keys
export const AUTH_QUERY_KEYS = {
  ROOT: ["auth"] as const,
  USER: ["auth", "user"] as const,
  SESSION: ["auth", "session"] as const,
  STATUS: ["auth", "status"] as const,
} as const;

// Routes
export const AUTH_ROUTES = {
  LOGIN: "/login",
  HOME: "/dashboard",
} as const;

// Cache Configuration
export const AUTH_CACHE_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
} as const;
