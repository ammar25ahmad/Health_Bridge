import { Router } from 'express';
import { register, login, logout, getMe, getAllUsers, deleteUser } from '../controllers/auth.controller.js';
import { authenticateUser, authorizeRoles } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/admin/register', authenticateUser, authorizeRoles('ADMIN'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateUser, getMe);
router.get('/users', authenticateUser, authorizeRoles('ADMIN'), getAllUsers);
router.delete('/users/:id', authenticateUser, authorizeRoles('ADMIN'), deleteUser);

export default router;
