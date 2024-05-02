const db = require("../../models");
const Sponsorship = db.sponsorships;
const Organization = db.organization;
const Event = db.events;
//getallsponserships
exports.getAllSponsorships = async (req, res) => {
    try {
        // Find all sponsorships and include the associated organization and event
        const sponsorships = await Sponsorship.findAll({
            include: [{ model: Organization, attributes: ['id', 'name'] }, { model: Event, attributes: ['id', 'name'] }]
        });

        res.send({ sponsorships });
    } catch (err) {
        console.error("Error fetching sponsorships:", err);
        res.status(500).send({
            message: "An error occurred while fetching sponsorships",
            errObj: err
        });
    }
};


// Add sponsorship
exports.addSponsorship = (req, res) => {
    const { organizationId, eventId, deckSent, commitmentAmount, space_id } = req.body;
    if (!organizationId || !eventId || !deckSent || !commitmentAmount || !space_id) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
    }

    // Create a new sponsorship object with the provided data
    const newSponsorship = {
        organization_id: organizationId,
        event_id: eventId,
        deckSent: deckSent,
        commitmentAmount: commitmentAmount,
        space_id
        // Add more fields as needed
    }

    // Use the Sponsorship model to create a new sponsorship in the database
    Sponsorship.create(newSponsorship)
        .then(data => {
            res.send({ success: true, sponsorship: data });
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).send({
                message: "Some error occurred while saving new Sponsorship",
                errObj: err
            });
        });
}

// Get specific sponsorship by ID
exports.getSponsorship = async (req, res) => {
    const id = req.params.id;

    try {
        const sponsorship = await Sponsorship.findByPk(id);

        if (!sponsorship) {
            return res.status(404).send({ message: "Sponsorship not found" });
        }

        res.send({ sponsorship });
    } catch (err) {
        console.error("Error fetching sponsorship:", err);
        res.status(500).send({
            message: "An error occurred while fetching sponsorship",
            errObj: err
        });
    }
};

// Delete specific sponsorship by ID
exports.deleteSponsorship = async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await Sponsorship.destroy({ where: { id: id } });

        if (!deleted) {
            return res.status(404).send({ message: "Sponsorship not found" });
        }

        res.send({ success: true });
    } catch (err) {
        console.error("Error deleting sponsorship:", err);
        res.status(500).send({
            message: "An error occurred while deleting sponsorship",
            errObj: err
        });
    }
};


exports.getAllSponsorshipsEventDetail = async (req, res) => {
    try {
        const eventId = req.params.eventId; // Get the eventId from the request parameters

        // Find all sponsorships where event_id matches the provided eventId
        const sponsorships = await Sponsorship.findAll({
            where: { event_id: eventId }
        });

        res.send({ sponsorships });
    } catch (err) {
        console.error("Error fetching sponsorships:", err);
        res.status(500).send({
            message: "An error occurred while fetching sponsorships",
            errObj: err
        });
    }
};
