import express from 'express';
import { sendMessage, updateMessage, deleteMessage } from '../controllers/messageController.js';
import { protectRoute } from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/sendMessage', protectRoute, sendMessage);
router.patch('/updateMessage/:id', protectRoute, updateMessage);
router.delete('/deleteMessage/:id', protectRoute, deleteMessage);

export default router;



