import express from 'express';
import {
  getAllConsultations,
  createConsultation,
  updateConsultation,
  deleteConsultation,
  getConsultationHistory,
  getConsultation
} from '../controllers/ConsultationController.js';
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Definisi route untuk mendapatkan semua konsultasi
router.get('/consultations', getAllConsultations);
router.get('/consultations/:id', getConsultation);
router.get('/consultation', getConsultationHistory)
router.post('/consultations', createConsultation);
router.put('/consultations/:id', updateConsultation);
router.delete('/consultations/:id', deleteConsultation);

export default router;
