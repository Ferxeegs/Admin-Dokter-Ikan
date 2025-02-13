import express from 'express';
import {
  getAllConsultations,
  createConsultation,
  updateConsultation,
  getConsultationHistory,
  getConsultation,
  enableChat,
  endConsultation
} from '../controllers/ConsultationController.js';
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Definisi route untuk mendapatkan semua konsultasi
router.get('/consultations', getAllConsultations);
router.get('/consultations/:id', getConsultation);
router.get('/consultation', getConsultationHistory)
router.post('/consultations', createConsultation);
router.put('/consultations/:id', updateConsultation);
router.patch("/consultations/:id/enable-chat", enableChat);
router.patch("/consultations/:id/end", endConsultation);

export default router;