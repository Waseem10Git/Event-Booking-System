import axios from "./axios";

const createBooking = eventId => axios.post("/bookings", {eventId});
const getAllBookings = () => axios.get("/bookings");
const getMyBookings = () => axios.get("/bookings/my");
const deleteBooking = id => axios.delete(`/bookings/${id}`);

const bookingApis = { createBooking, getAllBookings, getMyBookings, deleteBooking };
export default bookingApis;