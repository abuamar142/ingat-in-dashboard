export interface IUser {
  id?: string;
  number: string;
  absen_pagi: boolean;
  absen_sore: boolean;
  last_checkin?: string | null;
  created_at?: string;
  updated_at?: string;
}
