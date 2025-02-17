import express from 'express';
import { uploadFiles, getFiles, deleteFile, uploadFilesController } from '../controllers/UploadController.js';

const router = express.Router();

router.post('/upload', uploadFiles, uploadFilesController);
router.get('/uploads', getFiles);
router.delete('/delete-file', deleteFile);

export default router;