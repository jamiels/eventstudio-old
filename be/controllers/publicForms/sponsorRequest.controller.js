const db = require("../../models");
const SponsorRequest = db.sponsor_request;

exports.addSponsorRequest = async (req, res) => {
    try {
        const { eventUUID } = req.params;
        const requiredFields = ["name", "email", "involvement", "linkedIn"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }
        
        const newSponsorRequest = {
            name: req.body.name,
            email: req.body.email,
            involvement: req.body.involvement,
            linkedIn: req.body.linkedIn,
            eventUUID: eventUUID
        };

        const sponsorRequest = await SponsorRequest.create(newSponsorRequest);

        res.status(201).send({ message: "Sponsor request created successfully", sponsorRequest });
    } catch (error) {
        console.error("Error adding sponsor request:", error);
        res.status(500).send({ message: "An error occurred while adding sponsor request", error });
    }
};
