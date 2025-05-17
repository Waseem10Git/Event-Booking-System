import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const createBooking = async (req, res) => {
    const { eventId } = req.body;
    const userId = req.user.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(400).json({ success: false, messageKey: "eventNotFound" });

        const existing = await Booking.findOne({ user: userId, event: eventId });
        if (existing) return res.status(400).json({ success: false, messageKey: "alreadyBooked" });

        const booking = new Booking({ user: userId, event: eventId });
        await booking.save();
        res.status(201).json({ success: true, messageKey: "eventBooked" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('event');
        res.status(200).json(bookings);
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, messageKey: "serverError" });
      }
}

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('event');
        res.status(200).json(bookings);
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, messageKey: "serverError" });
      }
}

export const delelteBooking = async (req, res) => {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    try {
        const booking = await Booking.findOne({user: userId, event: eventId});
    
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (req.user.role !== 'Admin' && booking.user.toString() !== userId) {
          return res.status(403).json({ success: false, messageKey: "unauthorized" });
        }
    
        await booking.deleteOne({ user: userId, event: eventId });
        res.status(200).json({ success: true, messageKey: "bookingCancelled" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, messageKey: "serverError" });
      }
}