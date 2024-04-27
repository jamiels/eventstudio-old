const db = require("../../models");
const SponsorOnboarding = db.sponsor_boarding;
const Event = db.events;

exports.addSponsorOnboarding = async (req, res) => {
    try {
        const { eventUUID } = req.params;
        // Check if all required fields are present in the request body
        const requiredFields = ["fullName", "email", "bio", "linkedInURL", "twitterURL", "headshotURL", "title", "organization"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }

        const eventData = await Event.findOne({ where: { uuid: eventUUID } });

        if (!eventData) {
            return res.status(404).send({ message: `Event not found with the provided eventUUID ${eventUUID}` });
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
            eventName: eventData.name,
            eventUUID
        };

        const sponsorOnboarding = await SponsorOnboarding.create(newSponsorOnboarding);

        res.status(201).send({ message: "Sponsor onboarding created successfully", sponsorOnboarding });
    } catch (error) {
        console.error("Error adding sponsor onboarding:", error);
        res.status(500).send({ message: "An error occurred while adding sponsor onboarding", error });
    }
};
