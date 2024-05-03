const db = require("../../models");
const checkIsEvent = require("../../utils/checkIsEvent");
const SponsorRequest = db.sponsor_request;

exports.addSponsorRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const requiredFields = ["name", "email", "involvement", "linkedIn"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }
        const typeForm = await checkIsEvent(id);

        if (typeForm[0] === 0) {
            return res.status(404).json({ message: "Id does not exists." });
        }

        const newSponsorRequest = {
            name: req.body.name,
            email: req.body.email,
            involvement: req.body.involvement,
            linkedIn: req.body.linkedIn,
            eventUUID: typeForm[0] === 1 ? id : null,
            spaceUUID: typeForm[0] === 2 ? id : null,
        };

        const sponsorRequest = await SponsorRequest.create(newSponsorRequest);

        res.status(201).send({ message: "Sponsor request created successfully", sponsorRequest });
    } catch (error) {
        console.error("Error adding sponsor request:", error);
        res.status(500).send({ message: "An error occurred while adding sponsor request", error });
    }
};

exports.getAllSponsorRequests = async (req, res) => {
    try {
        const allSponsorRequests = await SponsorRequest.findAll({order: [['createdAt', 'DESC']]});
        res.status(200).send({ sponsorRequests: allSponsorRequests });
    } catch (error) {
        console.error("Error fetching sponsor requests:", error);
        res.status(500).send({ message: "An error occurred while fetching sponsor requests", error });
    }
};


exports.deleteSponsorRequest = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the sponsor request by id
        const sponsorRequest = await SponsorRequest.findByPk(id);

        // If sponsor request doesn't exist
        if (!sponsorRequest) {
            return res.status(404).send({ message: "Sponsor request not found" });
        }

        // Delete the sponsor request
        await sponsorRequest.destroy();

        res.status(200).send({ message: "Sponsor request deleted successfully" });
    } catch (error) {
        console.error("Error deleting sponsor request:", error);
        res.status(500).send({ message: "An error occurred while deleting sponsor request", error });
    }
};