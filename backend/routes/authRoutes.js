import express from 'express';
const router = express.Router();
import { register, login, logout } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

export default router;