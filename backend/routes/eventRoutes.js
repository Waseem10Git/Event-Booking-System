import express from 'express';
const router = express.Router();
import { getEvent, getEvents, addEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', verifyToken, isAdmin, upload.single('image'), addEvent);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), updateEvent);
router.delete('/:id', verifyToken, isAdmin, deleteEvent);

export default router;