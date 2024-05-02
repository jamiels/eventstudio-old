const db = require("../../models");
const Speakers = db.speakers;

// Add Speaker
exports.addSpeaker = async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, primaryAffiliation, title, headshot, linkedInURL, twitterURL, bio, adminFullName, adminEmailAddress, space_id } = req.body;
        // Check for required parameters
        if (!firstName || !space_id) {
            return res.status(400).send({
                message: 'Please provide all the fields.'
            });
        }
        
        // Create a new speaker object with the provided data
        const newSpeaker = {
            firstName,
            lastName,
            emailAddress,
            primaryAffiliation,
            title,
            headshot,
            linkedInURL,
            twitterURL,
            bio,
            adminFullName,
            adminEmailAddress,
            space_id
        }

        // Create a speaker in the database
        const speaker = await Speakers.create(newSpeaker);

        res.status(201).send({ success: true, speaker });
    } catch (err) {
        console.error("Error adding speaker:", err);
        res.status(500).send({
            message: "An error occurred while adding speaker.",
            errObj: err
        });
    }
};

// Delete Speaker
exports.deleteSpeaker = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the speaker exists
        const speaker = await Speakers.findByPk(id);
        if (!speaker) {
            return res.status(404).send({
                message: 'Speaker not found.'
            });
        }

        // Delete the speaker from the database
        await speaker.destroy();

        res.send({ success: true, message: 'Speaker deleted successfully.' });
    } catch (err) {
        console.error("Error deleting speaker:", err);
        res.status(500).send({
            message: "An error occurred while deleting speaker.",
            errObj: err
        });
    }
};

// Get all Speakers
exports.getAllSpeakers = async (req, res) => {
    try {
        const speakers = await Speakers.findAll();
        res.send({ speakers });
    } catch (err) {
        console.error("Error fetching speakers:", err);
        res.status(500).send({
            message: "An error occurred while fetching speakers.",
            errObj: err
        });
    }
};

// Get Specific Speaker by ID
exports.getSpeakerById = async (req, res) => {
    try {
        const { id } = req.params;
        const speaker = await Speakers.findByPk(id);

        if (!speaker) {
            return res.status(404).send({
                message: 'Speaker not found.'
            });
        }

        res.send({ speaker });
    } catch (err) {
        console.error("Error fetching speaker:", err);
        res.status(500).send({
            message: "An error occurred while fetching speaker.",
            errObj: err
        });
    }
};
