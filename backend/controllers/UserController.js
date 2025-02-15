import bcrypt from 'bcryptjs';
import User from "../models/UserModel.js";
import FishExperts from "../models/FishExpertsModel.js";
import jwt from 'jsonwebtoken';


export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    console.log("Registrasi attempt:", email);

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Registrasi gagal: Email sudah terdaftar");
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password.trim(), 10); // 10 adalah salt rounds
    console.log("Plain Password:", password);
    console.log("Hashed Password:", hashedPassword);

    // Jika email belum terdaftar, buat pengguna baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Menyimpan password yang sudah di-hash
      address,
      role,
    });

    console.log("Registrasi berhasil:", email);

    res.status(201).json({ message: "Pengguna berhasil ditambahkan", newUser });
  } catch (error) {
    console.error("Registrasi error:", error);
    res.status(500).json({ message: "Gagal menambahkan pengguna", error: error.message });
  }
};
// Fungsi login pengguna
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });

    console.log("User found:", user ? "Yes" : "No");

    // Jika pengguna tidak ditemukan
    if (!user) {
      console.log("Login gagal: Email tidak ditemukan");
      return res.status(404).json({ message: "Email atau password salah" });
    }

    // Periksa apakah role pengguna adalah admin
    if (user.role.toLowerCase() !== "admin") {
      console.log("Login gagal: Bukan admin");
      return res.status(403).json({ message: "Hanya admin yang diizinkan untuk login" });
    }

    // Memverifikasi apakah password cocok
    console.log("Received Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("Password match:", isMatch ? "Yes" : "No");

    if (!isMatch) {
      console.log("Login gagal: Password salah");
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Membuat token JWT
    const token = jwt.sign(
      { id: user.user_id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login berhasil:", email);

    // Mengirimkan respons sukses dengan token
    res.status(200).json({
      message: "Login berhasil",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat login", error: error.message });
  }
};


// }
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pengguna', error });
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);  // Perbaiki 'user' menjadi 'User'
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data pengguna', error });
  }
};


// Fungsi untuk menambahkan pengguna baru


// Fungsi untuk memperbarui data pengguna
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    const { name, email, address, role } = req.body; // Hapus password dari destructuring
    
    await user.update({ name, email, address, role });

    res.status(200).json({ message: 'Pengguna berhasil diperbarui', user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui pengguna', error });
  }
};


// Fungsi untuk menghapus pengguna
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus pengguna', error });
  }
};

export const getMe = async (req, res) => {
  try {
    const { id: userId } = req.user; // Ambil ID dari token
    console.log('User ID from token:', userId);

    // Cari pengguna di tabel Users
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    return res.status(200).json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role, // Role tetap ada jika dibutuhkan
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ message: 'Gagal mengambil data pengguna', error: error.message });
  }
};


