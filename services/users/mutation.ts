"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUser,
  deleteUser,
  postCreateUser,
  resetMorningAttendance,
  resetEveningAttendance,
} from "./api";
import { IUser } from "@/interfaces/users";

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<IUser> }) =>
      updateUser(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users", id] });
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData(["users", id]);
      const previousUsers = queryClient.getQueryData<IUser[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["users", id], (old: IUser | undefined) => {
        if (!old) return old;
        return { ...old, ...updates };
      });

      queryClient.setQueryData<IUser[]>(["users"], (old) => {
        if (!old) return old;
        return old.map((user) => (user.id === id ? { ...user, ...updates } : user));
      });

      return { previousUser, previousUsers };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(["users", id], context.previousUser);
      }
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<IUser[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData<IUser[]>(["users"], (old) => {
        if (!old) return old;
        return old.filter((user) => user.id !== id);
      });

      return { previousUsers };
    },
    onError: (err, id, context) => {
      // Rollback on error
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<IUser, "id" | "created_at" | "updated_at">) => postCreateUser(user),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Reset morning attendance mutation
export function useResetMorningAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetMorningAttendance,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

// Reset evening attendance mutation
export function useResetEveningAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetEveningAttendance,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
