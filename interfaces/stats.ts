export interface IStats {
  totalUsers: number;
  absenPagi: {
    sudah: number;
    belum: number;
    percentage: number;
  };
  absenSore: {
    sudah: number;
    belum: number;
    percentage: number;
  };
}
