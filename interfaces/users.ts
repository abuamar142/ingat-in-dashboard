export interface IUser {
  id?: string;
  number: string;
  name?: string | null;
  absen_pagi: boolean;
  absen_sore: boolean;
  last_checkin?: string | null;
  suspend_until?: string | null;
  created_at?: string;
  updated_at?: string;
}
