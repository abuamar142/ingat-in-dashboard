import { supabase } from "@/lib/supabase";
import { IUser } from "@/interfaces/users";

// Get all users
export async function getUsers(): Promise<IUser[]> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IUser[]) || [];
}

// Get single user by ID
export async function getUserById(id: string): Promise<IUser> {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error) throw error;
  return data as IUser;
}

// Update user
export async function updateUser(id: string, updates: Partial<IUser>): Promise<IUser> {
  const { data, error } = await supabase
    .from("users")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as IUser;
}

// Delete user
export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw error;
}

// Create user
export async function postCreateUser(
  user: Omit<IUser, "id" | "created_at" | "updated_at">
): Promise<IUser> {
  const { data, error } = await supabase.from("users").insert(user).select().single();

  if (error) throw error;
  return data as IUser;
}

// Reset morning attendance for all users
export async function resetMorningAttendance(): Promise<void> {
  const { error } = await supabase
    .from("users")
    .update({ absen_pagi: false, updated_at: new Date().toISOString() })
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Update all rows

  if (error) throw error;
}

// Reset evening attendance for all users
export async function resetEveningAttendance(): Promise<void> {
  const { error } = await supabase
    .from("users")
    .update({ absen_sore: false, updated_at: new Date().toISOString() })
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Update all rows

  if (error) throw error;
}
