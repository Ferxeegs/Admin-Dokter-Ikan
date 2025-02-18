import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
} from "../controllers/UserController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; // Impor middleware authenticate

const router = express.Router();

// Rute yang tidak memerlukan autentikasi
router.post('/register', createUser); // Mendaftar pengguna baru
router.post('/login', loginUser); // Login pengguna

// Rute yang memerlukan autentikasi
router.get('/users', getAllUsers); // Mendapatkan semua pengguna (diperlukan autentikasi)
router.get('/users/:id', getUserById); // Mendapatkan pengguna berdasarkan ID (diperlukan autentikasi)
router.put('/users/:id', updateUser); // Memperbarui pengguna berdasarkan ID (diperlukan autentikasi)
router.delete('/users/:id', deleteUser); // Menghapus pengguna berdasarkan ID (diperlukan autentikasi)
router.get('/me',authenticate, getMe);
router.put('/me',authenticate, UpdateMe);


export default router;
