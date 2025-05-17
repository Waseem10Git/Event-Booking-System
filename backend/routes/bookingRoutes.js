import express from 'express';
const router = express.Router();
import { createBooking, getAllBookings, getMyBookings, delelteBooking } from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/roleMiddleware.js';

router.post('/', verifyToken, createBooking);
router.get('/', verifyToken, isAdmin, getAllBookings);
router.get('/my', verifyToken, getMyBookings);
router.delete('/:eventId', verifyToken, delelteBooking);

export default router;