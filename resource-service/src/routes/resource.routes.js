import { Router } from 'express';
import { authenticateUser, authorizeRoles } from '../middleware/auth.middleware.js';
import {
  getResources, getResourceById, createResource, updateResource, deleteResource, updateResourceStatus,
  getArticles, getArticleById, createArticle, updateArticle, deleteArticle,
  createQuestion, getQuestions, updateQuestion,
} from '../controllers/resource.controller.js';

const router = Router();

router.get('/resources', getResources);
router.get('/resources/:id', getResourceById);
router.post('/resources', authenticateUser, createResource);
router.put('/resources/:id', authenticateUser, updateResource);
router.delete('/resources/:id', authenticateUser, deleteResource);
router.patch('/resources/:id/status', authenticateUser, authorizeRoles('ADMIN'), updateResourceStatus);

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', authenticateUser, authorizeRoles('ORGANIZATION', 'ADMIN'), createArticle);
router.put('/articles/:id', authenticateUser, updateArticle);
router.delete('/articles/:id', authenticateUser, deleteArticle);

router.post('/questions', authenticateUser, createQuestion);
router.get('/questions', authenticateUser, getQuestions);
router.patch('/questions/:id', authenticateUser, updateQuestion);

export default router;
