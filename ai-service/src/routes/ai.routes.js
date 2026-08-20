import { Router } from 'express';
import { chat, ragChat, agentChat } from '../controllers/ai.controller.js';

const router = Router();

router.post('/chat', chat);
router.post('/rag', ragChat);
router.post('/agent', agentChat);

export default router;
