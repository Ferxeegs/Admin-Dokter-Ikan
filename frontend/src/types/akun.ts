export interface Akun {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  address?: string;  // Pastikan address ada dalam tipe
}

