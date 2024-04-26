const db = require("../../models");
const Org = db.organization;


exports.add = (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
    }

    // Create a new venue object with the provided data
    const newOrg = {
        name,
    }

    // Use the Venue model to create a new venue in the database
    Org.create(newOrg)
        .then(data => {
            res.send({ success: true, venue: data });
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while saving new Organization",
                errObj: err
            });
        });
}

exports.getAllOrgNames = async (req, res) => {
    try {
        // Find all venues and select only the 'name' attribute
        const orgNames = await Org.findAll();

        // Extract the names from the venue objects

        res.send({ orgNames });
    } catch (err) {
        console.error("Error fetching organization names:", err);
        res.status(500).send({
            message: "An error occurred while fetching organization names",
            errObj: err
        });
    }
};
