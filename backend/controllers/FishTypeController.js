import FishType from "../models/FishTypeModel.js"; // Import model FishType
import "regenerator-runtime/runtime.js";
// Fungsi untuk mendapatkan semua Fish Types
export const getAllFishTypes = async (req, res) => {
  try {
    const fishTypes = await FishType.findAll();
    res.status(200).json(fishTypes);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jenis ikan', error });
  }
};

// Fungsi untuk mendapatkan Fish Type berdasarkan ID
export const getFishTypeById = async (req, res) => {
  try {
    const fishType = await FishType.findByPk(req.params.id);
    if (!fishType) {
      return res.status(404).json({ message: 'Jenis ikan tidak ditemukan' });
    }
    res.status(200).json(fishType);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data jenis ikan', error });
  }
};

// Fungsi untuk menambahkan Fish Type baru
export const createFishType = async (req, res) => {
  try {
    const { name, description, habitat, image } = req.body;
    const newFishType = await FishType.create({ name, description, habitat, image });
    res.status(201).json({ message: 'Jenis ikan berhasil ditambahkan', newFishType });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan jenis ikan', error });
  }
};

// Fungsi untuk memperbarui data Fish Type
// controllers/uploadController.js
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File tidak ditemukan.' });
  }
  // Menggunakan forward slash untuk path
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({ filePath });
};

// Controller untuk memperbarui spesies ikan
export const updateFishType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, other_name, latin_name, description, habitat, image } = req.body;

    const fishType = await FishType.findByPk(id);
    if (!fishType) {
      return res.status(404).json({ message: "Jenis ikan tidak ditemukan" });
    }

    if (req.file) {
      console.log("File yang diunggah:", req.file); // Log ini seharusnya muncul
      imageUrl = `/uploads/${req.file.filename}`; // Gunakan path relatif yang benar
    }

    await fishType.update({
      name,
      other_name, 
      latin_name,
      description,
      habitat,
      image
    });
    // console.log("Fish type setelah update:", fishType); // Log ini seharusnya muncul
    res.status(200).json({
      message: "Jenis ikan berhasil diperbarui",
      fishType: {
        id: fishType.id,
        name: fishType.name,
        other_name : fishType.other_name, 
        latin_name : fishType.latin_name,
        description: fishType.description,
        habitat: fishType.habitat,
        image: fishType.image,
      },
    });
  } catch (error) {
    console.error("Error updating fish type:", error); // Log ini seharusnya muncul
    res.status(500).json({ message: "Gagal memperbarui spesies ikan", error });
  }
};



// Fungsi untuk menghapus Fish Type
export const deleteFishType = async (req, res) => {
  try {
    const fishType = await FishType.findByPk(req.params.id);
    if (!fishType) {
      return res.status(404).json({ message: 'Jenis ikan tidak ditemukan' });
    }

    await fishType.destroy();
    res.status(200).json({ message: 'Jenis ikan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus jenis ikan', error });
  }
};
