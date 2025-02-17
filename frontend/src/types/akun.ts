export interface Akun {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phone_number: string;
  address?: string;  // Pastikan address ada dalam tipe
}

