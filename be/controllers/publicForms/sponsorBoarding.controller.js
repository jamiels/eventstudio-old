const db = require("../../models");
const checkIsEvent = require("../../utils/checkIsEvent");
const SponsorOnboarding = db.sponsor_boarding;
const Event = db.events;

exports.addSponsorOnboarding = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if all required fields are present in the request body
        const requiredFields = ["fullName", "email", "bio", "linkedInURL", "twitterURL", "headshotURL", "title", "organization"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }

        const typeForm = await checkIsEvent(id);

        if (typeForm[0] === 0) {
            return res.status(404).json({ message: "Id does not exists." });
        }

        const newSponsorOnboarding = {
            fullName: req.body.fullName,
            email: req.body.email,
            bio: req.body.bio,
            linkedInURL: req.body.linkedInURL,
            twitterURL: req.body.twitterURL,
            headshotURL: req.body.headshotURL,
            title: req.body.title,
            organization: req.body.organization,
            eventName: typeForm[0] === 1 ? typeForm[1]?.name : null,
            eventUUID: typeForm[0] === 1 ? id : null,
            spaceUUID: typeForm[0] === 2 ? id : null,
        };

        const sponsorOnboarding = await SponsorOnboarding.create(newSponsorOnboarding);

        res.status(201).send({ message: "Sponsor onboarding created successfully", sponsorOnboarding });
    } catch (error) {
        console.error("Error adding sponsor onboarding:", error);
        res.status(500).send({ message: "An error occurred while adding sponsor onboarding", error });
    }
};


exports.getAllSponsorBoardings = async (req, res) => {
    try {
        const allSponsorBoardings = await SponsorOnboarding.findAll();
        res.status(200).send({ sponsorBoardings: allSponsorBoardings });
    } catch (error) {
        console.error("Error fetching sponsor boardings:", error);
        res.status(500).send({ message: "An error occurred while fetching sponsor boardings", error });
    }
};

exports.deleteSponsorOnboarding = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the sponsor onboarding by id
        const sponsorOnboarding = await SponsorOnboarding.findByPk(id);

        // If sponsor onboarding doesn't exist
        if (!sponsorOnboarding) {
            return res.status(404).send({ message: "Sponsor onboarding not found" });
        }

        // Delete the sponsor onboarding
        await sponsorOnboarding.destroy();

        res.status(200).send({ message: "Sponsor onboarding deleted successfully" });
    } catch (error) {
        console.error("Error deleting sponsor onboarding:", error);
        res.status(500).send({ message: "An error occurred while deleting sponsor onboarding", error });
    }
};