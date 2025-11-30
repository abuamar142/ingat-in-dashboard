"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById } from "./api";

// Get all users
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single user
export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}
