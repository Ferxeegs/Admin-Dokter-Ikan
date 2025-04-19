import express from 'express';
import { uploadFiles, getFiles, deleteFile, uploadFilesController } from '../controllers/UploadController.js';
import { uploadcloud, uploadImages, deleteImage, uploadMedicineImages, uploadFishImages, uploadExpertImages, uploadArticleImages } from "../controllers/UploadCloudinaryController.js";

const router = express.Router();

router.post('/upload', uploadFiles, uploadFilesController);
router.get('/uploads', getFiles);
router.delete('/delete-file', deleteFile);
router.post("/uploadcloud", uploadcloud, uploadImages);
router.post("/uploadcloudmed", uploadcloud, uploadMedicineImages);
router.post("/uploadcloudfish", uploadcloud, uploadFishImages);
router.post("/uploadcloudexpert", uploadcloud, uploadExpertImages);
router.post("/uploadcloudarticle", uploadcloud, uploadArticleImages);
router.delete("/delete", deleteImage);

export default router;