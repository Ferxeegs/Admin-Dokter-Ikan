import express from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} from '../controllers/ArticleController.js';

const router = express.Router();

router.get('/articles', getAllArticles);
router.get('/article/:id', getArticleById);
router.post('/article', createArticle);
router.put('/article/:id', updateArticle);
router.delete('/article/:id', deleteArticle);

export default router;
