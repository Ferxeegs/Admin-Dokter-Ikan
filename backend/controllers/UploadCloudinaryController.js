import cloudinary from "../config/CloudinaryConfig.js";
import multer from "multer";

// Setup multer untuk menyimpan file di buffer memory
const uploadcloud = multer({ storage: multer.memoryStorage() }).array("files", 10); // Bisa upload hingga 10 file

const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload semua file ke Cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "dokter_ikan" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                ).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Log data yang dikirimkan ke frontend
        console.log("Uploaded images:", uploadedImages);

        res.json({ images: uploadedImages });
    } catch (error) {
        console.error("Error uploading images:", error);
        res.status(500).json({ error: error.message });
    }
};

const uploadMedicineImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload semua file ke folder `dokter_ikan_profile` di Cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "medicine" }, // Folder yang berbeda
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                ).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Log data yang dikirimkan ke frontend
        console.log("Uploaded medicine images:", uploadedImages);

        res.json({ images: uploadedImages });
    } catch (error) {
        console.error("Error uploading medicine images:", error);
        res.status(500).json({ error: error.message });
    }
};
const uploadFishImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload semua file ke folder `dokter_ikan_profile` di Cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "fish_type" }, // Folder yang berbeda
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                ).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Log data yang dikirimkan ke frontend
        console.log("Uploaded fish images:", uploadedImages);

        res.json({ images: uploadedImages });
    } catch (error) {
        console.error("Error uploading fish images:", error);
        res.status(500).json({ error: error.message });
    }
};

const uploadExpertImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload semua file ke folder `dokter_ikan_profile` di Cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "expert" }, // Folder yang berbeda
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                ).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Log data yang dikirimkan ke frontend
        console.log("Uploaded expert images:", uploadedImages);

        res.json({ images: uploadedImages });
    } catch (error) {
        console.error("Error uploading expert images:", error);
        res.status(500).json({ error: error.message });
    }
};

const uploadArticleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        // Upload semua file ke folder `dokter_ikan_profile` di Cloudinary
        const uploadPromises = req.files.map((file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "article" }, // Folder yang berbeda
                    (error, result) => {
                        if (error) reject(error);
                        else resolve({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    }
                ).end(file.buffer);
            });
        });

        const uploadedImages = await Promise.all(uploadPromises);

        // Log data yang dikirimkan ke frontend
        console.log("Uploaded expert images:", uploadedImages);

        res.json({ images: uploadedImages });
    } catch (error) {
        console.error("Error uploading expert images:", error);
        res.status(500).json({ error: error.message });
    }
};
// Fungsi menghapus gambar berdasarkan public_id
const deleteImage = async (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            return res.status(400).json({ message: "No public_id provided" });
        }

        // Hapus gambar dari Cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result !== "ok") {
            return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
        }

        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: error.message });
    }
};

export { uploadcloud, uploadImages, deleteImage, uploadMedicineImages, uploadFishImages, uploadExpertImages, uploadArticleImages };