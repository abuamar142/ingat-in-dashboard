"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUser,
  deleteUser,
  createUser,
  resetMorningAttendance,
  resetEveningAttendance,
} from "./api";
import { IUser } from "@/interfaces/users";
import { USER_QUERY_KEYS } from "@/constants";

/**
 * User mutation hooks
 */

// Helper: Invalidate all user queries
const invalidateUserQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.ROOT });
};

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<IUser> }) =>
      updateUser(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.DETAIL(id) });
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.ROOT });

      // Snapshot previous values
      const previousUser = queryClient.getQueryData(USER_QUERY_KEYS.DETAIL(id));
      const previousUsers = queryClient.getQueryData<IUser[]>(USER_QUERY_KEYS.ROOT);

      // Optimistic update
      queryClient.setQueryData(USER_QUERY_KEYS.DETAIL(id), (old: IUser | undefined) =>
        old ? { ...old, ...updates } : old
      );

      queryClient.setQueryData<IUser[]>(USER_QUERY_KEYS.ROOT, (old) =>
        old ? old.map((user) => (user.id === id ? { ...user, ...updates } : user)) : old
      );

      return { previousUser, previousUsers };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(USER_QUERY_KEYS.DETAIL(id), context.previousUser);
      }
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEYS.ROOT, context.previousUsers);
      }
    },
    onSettled: () => invalidateUserQueries(queryClient),
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.ROOT });

      const previousUsers = queryClient.getQueryData<IUser[]>(USER_QUERY_KEYS.ROOT);

      // Optimistic update
      queryClient.setQueryData<IUser[]>(USER_QUERY_KEYS.ROOT, (old) =>
        old ? old.filter((user) => user.id !== id) : old
      );

      return { previousUsers };
    },
    onError: (err, id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_QUERY_KEYS.ROOT, context.previousUsers);
      }
    },
    onSettled: () => invalidateUserQueries(queryClient),
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Omit<IUser, "id" | "created_at" | "updated_at">) => createUser(user),
    onSuccess: () => invalidateUserQueries(queryClient),
  });
}

export function useResetMorningAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetMorningAttendance,
    onSuccess: () => invalidateUserQueries(queryClient),
  });
}

export function useResetEveningAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetEveningAttendance,
    onSuccess: () => invalidateUserQueries(queryClient),
  });
}
