import express from 'express';
import { 
    getAllUserConsultations, 
    getUserConsultationById, 
    createUserConsultation,
    deleteUserConsultation,
    getUserConsultationHistory, 
    
} from '../controllers/UserConsultationController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { validateConsultation } from '../middlewares/validateConsultation.js';

const router = express.Router();

router.get('/user-consultations', getAllUserConsultations);
router.get('/user-consultations/:id', getUserConsultationById);
router.post('/user-consultations', validateConsultation, createUserConsultation);
router.delete('/user-consultations', deleteUserConsultation);
router.get('/user-consultation',getUserConsultationHistory);``

export default router;
