export interface User {
  id?: string
  number: string
  absen_pagi: boolean
  absen_sore: boolean
  last_checkin?: string | null
  created_at?: string
  updated_at?: string
}

export interface Stats {
  totalUsers: number
  absenPagi: {
    sudah: number
    belum: number
    percentage: number
  }
  absenSore: {
    sudah: number
    belum: number
    percentage: number
  }
}
