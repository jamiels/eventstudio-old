const db = require("../../models");
const checkIsEvent = require("../../utils/checkIsEvent");
const SpeakerOnboarding = db.speaker_onboarding;
const Event = db.events;

exports.addSpeakerOnboarding = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if all required fields are present in the request body
        const requiredFields = ["fullName", "email", "bio", "linkedInURL", "twitterURL", "title", "organization"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }

        const typeForm = await checkIsEvent(id);

        if (typeForm[0] === 0) {
            return res.status(404).json({ message: "Id does not exists." });
        }

        const headshotUUID = req.file.filename.split('.')[0]; // Extract UUID from filename
        const headshotURL = `${process.env.SERVER_URL}/headshots/${headshotUUID}.jpg`;

        const newSpeakerOnboarding = {
            fullName: req.body.fullName,
            email: req.body.email,
            bio: req.body.bio,
            linkedInURL: req.body.linkedInURL,
            twitterURL: req.body.twitterURL,
            headshotURL: headshotURL,
            title: req.body.title,
            organization: req.body.organization,
            eventName: typeForm[0] === 1 ? typeForm[1]?.name : null,
            eventUUID: typeForm[0] === 1 ? id : null,
            spaceUUID: typeForm[0] === 2 ? id : null,
        };
    
        const speakerOnboarding = await SpeakerOnboarding.create(newSpeakerOnboarding);

        res.status(201).send({ message: "Speaker onboarding created successfully", speakerOnboarding });
    } catch (error) {
        console.error("Error adding speaker onboarding:", error);
        res.status(500).send({ message: "An error occurred while adding speaker onboarding", error });
    }
};


exports.getAllSpeakerOnboardings = async (req, res) => {
    try {
        const allSpeakerOnboardings = await SpeakerOnboarding.findAll();
        res.status(200).send({ speakerOnboardings: allSpeakerOnboardings });
    } catch (error) {
        console.error("Error fetching speaker onboardings:", error);
        res.status(500).send({ message: "An error occurred while fetching speaker onboardings", error });
    }
};

exports.deleteSpeakerOnboarding = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the speaker onboarding by id
        const speakerOnboarding = await SpeakerOnboarding.findByPk(id);

        // If speaker onboarding doesn't exist
        if (!speakerOnboarding) {
            return res.status(404).send({ message: "Speaker onboarding not found" });
        }

        // Delete the speaker onboarding
        await speakerOnboarding.destroy();

        res.status(200).send({ message: "Speaker onboarding deleted successfully" });
    } catch (error) {
        console.error("Error deleting speaker onboarding:", error);
        res.status(500).send({ message: "An error occurred while deleting speaker onboarding", error });
    }
};
