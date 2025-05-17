import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  category: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  tags: [{
    en: { type: String, required: true },
    ar: { type: String, required: true }
  }],
  date: { type: Date, required: true },
  venue: { 
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  price: { type: Number, min: 0, required: true },
  image: {
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
