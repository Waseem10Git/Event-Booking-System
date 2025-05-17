import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const getEvent = async (req, res) => {
    const id = req.params.id;

    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const addEvent = async (req, res) => {
    const { name, description, category, tags, date, venue, price } = req.body;

    const tagArray = JSON.parse(tags);

    try {
        const event = new Event({ 
            name: JSON.parse(name),
            description: JSON.parse(description),
            category: JSON.parse(category),
            venue: JSON.parse(venue),
            tags: JSON.parse(tags),
            date,
            price, 
            image: req.file
            ? {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size,
            }
            : null, });

        await event.save();
        res.status(201).json({ success: true, messageKey: "eventCreated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const updateEvent = async (req, res) => {
    const id = req.params.id;
    const { name, description, category, tags, date, venue, price } = req.body;

    try {
        const event = await Event.findById(id);

        if (!event)
            return res.status(404).json({ success: false, messageKey: "eventNotFound" });

        const updatedData = {
            name: JSON.parse(name),
            description: JSON.parse(description),
            category: JSON.parse(category),
            venue: JSON.parse(venue),
            tags: JSON.parse(tags),
            date,
            price
        };

        // Check if new image file is uploaded
        if (req.file) {
            updatedData.image = {
                filename: req.file.filename,
                path: req.file.path,
                mimetype: req.file.mimetype,
                size: req.file.size,
            };
        }

        await Event.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        res.status(200).json({ success: true, messageKey: "eventUpdated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}

export const deleteEvent = async (req, res) => {
    const id = req.params.id;

    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ success: true, messageKey: "eventDeleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, messageKey: "serverError" });
    }
}