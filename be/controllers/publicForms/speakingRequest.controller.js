const db = require("../../models");
const checkIsEvent = require("../../utils/checkIsEvent");
const SpeakingRequest = db.speaking_request;
const Event = db.events;

exports.addSpeakingRequest = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if all required fields are present in the request body
        const requiredFields = ["fullName", "email", "organization", "title", "panelists", "abstract", "linkedInURL", "sponsorshipInterest"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }
        const typeForm = await checkIsEvent(id);

        if (typeForm[0] === 0) {
            return res.status(404).json({ message: "Id does not exists." });
        }

        const newSpeakingRequest = {
            fullName: req.body.fullName,
            email: req.body.email,
            organization: req.body.organization,
            eventName: typeForm[0] === 1 ? typeForm[1]?.name : null,
            title: req.body.title,
            panelists: req.body.panelists,
            abstract: req.body.abstract,
            linkedInURL: req.body.linkedInURL,
            sponsorshipInterest: req.body.sponsorshipInterest,
            eventUUID: typeForm[0] === 1 ? id : null,
            spaceUUID: typeForm[0] === 2 ? id : null,
        };

        const speakingRequest = await SpeakingRequest.create(newSpeakingRequest);

        res.status(201).send({ message: "Speaking request created successfully", speakingRequest });
    } catch (error) {
        console.error("Error adding speaking request:", error);
        res.status(500).send({ message: "An error occurred while adding speaking request", error });
    }
};

exports.getAllSpeakingRequests = async (req, res) => {
    try {
        const allSpeakingRequests = await SpeakingRequest.findAll({order: [['createdAt', 'DESC']]});
        res.status(200).send({ speakingRequests: allSpeakingRequests });
    } catch (error) {
        console.error("Error fetching speaking requests:", error);
        res.status(500).send({ message: "An error occurred while fetching speaking requests", error });
    }
};

exports.deleteSpeakingRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the speaking request by id
        const speakingRequest = await SpeakingRequest.findByPk(id);

        // If speaking request doesn't exist
        if (!speakingRequest) {
            return res.status(404).send({ message: "Speaking request not found" });
        }

        // Delete the speaking request
        await speakingRequest.destroy();

        res.status(200).send({ message: "Speaking request deleted successfully" });
    } catch (error) {
        console.error("Error deleting speaking request:", error);
        res.status(500).send({ message: "An error occurred while deleting speaking request", error });
    }
};