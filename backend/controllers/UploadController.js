import path from "path";
import fs from "fs";
import multer from "multer";

const UPLOADS_DIR = "uploads";

// Pastikan folder tersedia
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// Controller untuk upload file
export const uploadFiles = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Tidak ada file yang diunggah." });
      }
  
      const filePath = `/uploads/${req.file.filename}`; // Path relatif untuk frontend
  
      res.status(201).json({ message: "File berhasil diunggah", filePath });
    } catch (error) {
      console.error("❌ Error Upload:", error.message);
      res.status(500).json({ message: "Gagal mengunggah file", error: error.message });
    }
  };

export const getFiles = (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to list files' });
        }
        res.json(files.map(file => ({ fileName: file, url: `/uploads/${file}` })));
    });
};

export const deleteFile = (req, res) => {
    const { fileName } = req.body; // Ambil nama file dari body request
    
    if (!fileName) {
        return res.status(400).json({ message: 'File name is required' });
    }

    const filePath = path.join(UPLOADS_DIR, fileName); // Path lengkap file yang akan dihapus

    // Hapus file dari server lokal
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Gagal menghapus file:', err);
            return res.status(500).json({ message: 'Failed to delete file' });
        }

        res.json({ message: 'File successfully deleted' });
    });
};

