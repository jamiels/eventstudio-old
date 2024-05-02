const db = require("../models");
const Event = db.events;
const Space = db.space;

const checkIsEvent = async (id) => {
    try {
        // Check if the ID corresponds to an event
        const eventData = await Event.findOne({ where: { uuid: id } });
        if (eventData) {
            return [1, eventData];
        }

        // Check if the ID corresponds to a space
        const spaceData = await Space.findOne({ where: { uuid: id } });
        if (spaceData) {
            return [2, spaceData];
        }

        // If neither event nor space data is found, return null
        return [0, null];
    } catch (error) {
        console.error("Error checking ID type:", error);
        throw error;
    }
};

module.exports = checkIsEvent