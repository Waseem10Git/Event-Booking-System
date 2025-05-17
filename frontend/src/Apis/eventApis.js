import axios from "./axios";

const getEvents = () => axios.get("/events");
const getEvent = id => axios.get(`/events/${id}`);
const addEvent = data => axios.post("/events", data);
const updateEvent = (id, data) => axios.put(`/events/${id}`, data);
const deleteEvent = id => axios.delete(`/events/${id}`);

const eventApis = { getEvents, getEvent, addEvent, updateEvent, deleteEvent };
export default eventApis;