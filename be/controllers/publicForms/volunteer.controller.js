const db = require("../../models");
const Volunteer = db.volunteer;
const checkIsEvent = require('../../utils/checkIsEvent')

exports.addVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const requiredFields = ["fullName", "email", "linkedInURL"];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).send({ message: `${field} is required` });
            }
        }
        const typeForm = await checkIsEvent(id);

        if (typeForm[0] === 0) {
            return res.status(404).json({ message: "Id does not exists." });
        }

        const newVolunteer = {
            eventUUID: typeForm[0] === 1 ? id : null,
            spaceUUID: typeForm[0] === 2 ? id : null,
            fullName: req.body.fullName,
            email: req.body.email,
            mobilePhone: req.body.mobilePhone,
            communicationTools: req.body.communicationTools,
            telegramID: req.body.telegramID,
            linkedInURL: req.body.linkedInURL,
            areasOfSupport: req.body.areasOfSupport,
            businessAttire: req.body.businessAttire
        };

        const volunteer = await Volunteer.create(newVolunteer);

        res.status(201).send({ message: "Volunteer created successfully", volunteer });
    } catch (error) {
        console.error("Error adding volunteer:", error);
        res.status(500).send({ message: "An error occurred while adding volunteer", error });
    }
};

exports.getAllVolunteers = async (req, res) => {
    try {
        const allVolunteers = await Volunteer.findAll();
        res.status(200).send({ volunteers: allVolunteers });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).send({ message: "An error occurred while fetching volunteers", error });
    }
};


exports.deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the volunteer by id
        const volunteer = await Volunteer.findByPk(id);

        // If volunteer doesn't exist
        if (!volunteer) {
            return res.status(404).send({ message: "Volunteer not found" });
        }

        // Delete the volunteer
        await volunteer.destroy();

        res.status(200).send({ message: "Volunteer deleted successfully" });
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).send({ message: "An error occurred while deleting volunteer", error });
    }
};















