import express from 'express';
import { registerUser, loginUser, refreshToken } from '../controllers/userControll.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh-token', refreshToken);

export default router;
