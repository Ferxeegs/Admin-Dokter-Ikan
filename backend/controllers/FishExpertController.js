import FishExperts from "../models/FishExpertsModel.js";
import bcrypt from 'bcryptjs';
import "regenerator-runtime/runtime.js";
// Mendapatkan semua data Fish Experts
export const getAllFishExperts = async (req, res) => {
  try {
    const experts = await FishExperts.findAll();
    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data Fish Experts", error });
  }
};

// Mendapatkan Fish Expert berdasarkan ID
export const getFishExpertById = async (req, res) => {
  try {
    const expert = await FishExperts.findByPk(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: "Fish Expert tidak ditemukan" });
    }
    res.status(200).json(expert);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data Fish Expert", error });
  }
};

// Menambahkan Fish Expert baru
export const createFishExpert = async (req, res) => {
  try {
    const { name, email, password, phone_number, specialization, experience, image_url} = req.body;

    // Cek apakah email sudah terdaftar
    const existingExpert = await FishExperts.findOne({ where: { email } });
    if (existingExpert) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Enkripsi password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah jumlah salt rounds

    // Membuat entri baru di tabel FishExperts
    const newExpert = await FishExperts.create({
      name,
      email,
      password: hashedPassword, // Simpan password yang sudah dienkripsi
      phone_number,
      specialization,
      experience,
      image_url,
    });

    res.status(201).json({
      message: "Fish Expert berhasil ditambahkan",
      data: {
        id: newExpert.fishExperts_id,
        name: newExpert.name,
        email: newExpert.email,
        phone_number: newExpert.phone_number,
        specialization: newExpert.specialization,
        experience: newExpert.experience,
        image_url: newExpert.image_url,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menambahkan Fish Expert", error: error.message });
  }
};

// Memperbarui data Fish Expert berdasarkan ID
export const updateFishExpert = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone_number, specialization, experience, image_url } = req.body;

    const expert = await FishExperts.findByPk(id);
    if (!expert) {
      return res.status(404).json({ message: "Fish Expert tidak ditemukan" });
    }

    await expert.update({
      name,
      email,
      phone_number,
      specialization,
      experience,
      image_url,
    });

    res.status(200).json({
      message: "Fish Expert berhasil diperbarui",
      data: expert,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal memperbarui Fish Expert", error });
  }
};

// Menghapus Fish Expert berdasarkan ID
export const deleteFishExpert = async (req, res) => {
  try {
    const { id } = req.params;

    const expert = await FishExperts.findByPk(id);
    if (!expert) {
      return res.status(404).json({ message: "Fish Expert tidak ditemukan" });
    }

    await expert.destroy();
    res.status(200).json({ message: "Fish Expert berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus Fish Expert", error });
  }
};
