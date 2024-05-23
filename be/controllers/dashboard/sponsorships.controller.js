const db = require("../../models");
const Sponsorship = db.sponsorships;
const Organization = db.organization;
const Event = db.events;

// Get all sponsorships
exports.getAllSponsorships = async (req, res) => {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            return res.status(400).send({ message: "spaceId not found." });
        }
        const sponsorships = await Sponsorship.findAll({
            where: { space_id: spaceId },
            include: [
                { model: Organization, attributes: ['id', 'name'] },
                { model: Event, attributes: ['id', 'name'] }
            ]
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
    const {
        organizationId,
        eventId,
        contactPerson,
        contactEmailAddress,
        invoicePerson,
        invoiceEmailAddress,
        deckSent,
        contractSent,
        invoiceSent,
        paymentReceived,
        commitmentAmount,
        space_id
    } = req.body;

    if (!organizationId || !eventId || !contactPerson || !contactEmailAddress || !invoicePerson || !invoiceEmailAddress || !commitmentAmount || !space_id) {
        return res.status(400).send({
            message: 'Please provide all the required fields.'
        });
    }

    const newSponsorship = {
        organization_id: organizationId,
        event_id: eventId,
        contact_person: contactPerson,
        contact_email_address: contactEmailAddress,
        invoice_person: invoicePerson,
        invoice_email_address: invoiceEmailAddress,
        deck_sent: deckSent,
        contract_sent: contractSent,
        invoice_sent: invoiceSent,
        payment_received: paymentReceived,
        commitment_amount: commitmentAmount,
        space_id
    };

    Sponsorship.create(newSponsorship)
        .then(data => {
            res.send({ success: true, sponsorship: data });
        })
        .catch(err => {
            console.log("Error", err);
            res.status(500).send({
                message: "Some error occurred while saving new Sponsorship",
                errObj: err
            });
        });
};


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



// Get all sponsorships for a specific event
exports.getAllSponsorshipsEventDetail = async (req, res) => {
    try {
        const eventId = req.params.eventId;

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


// Update sponsorship
exports.updateSponsorship = async (req, res) => {
    const id = req.params.id;
    const {
        organizationId,
        eventId,
        contactPerson,
        contactEmailAddress,
        invoicePerson,
        invoiceEmailAddress,
        deckSent,
        contractSent,
        invoiceSent,
        paymentReceived,
        commitmentAmount,
        space_id
    } = req.body;

    try {
        let sponsorship = await Sponsorship.findByPk(id);

        if (!sponsorship) {
            return res.status(404).send({ message: "Sponsorship not found." });
        }

        const updateSponsorship = {
            organization_id: organizationId,
            event_id: eventId,
            contact_person: contactPerson,
            contact_email_address: contactEmailAddress,
            invoice_person: invoicePerson,
            invoice_email_address: invoiceEmailAddress,
            deck_sent: deckSent,
            contract_sent: contractSent,
            invoice_sent: invoiceSent,
            payment_received: paymentReceived,
            commitment_amount: commitmentAmount,
            space_id
        };

        await Sponsorship.update(updateSponsorship, { where: { id: id } });

        res.send({ success: true });
    } catch (err) {
        console.log("Error updating sponsorship:", err);
        res.status(500).send({
            message: "Error updating sponsorship with id=" + id,
            errObj: err
        });
    }
};
