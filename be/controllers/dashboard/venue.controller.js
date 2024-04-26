const db = require("../../models");
const Venue = db.venue;


exports.add = (req, res) => {
    const { name } = req.body;
    console.log("data", name);
    if (!name) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
    }

    // Create a new venue object with the provided data
    const newVenue = {
        name,
    }

    // Use the Venue model to create a new venue in the database
    Venue.create(newVenue)
        .then(data => {
            res.send({ success: true, venue: data });
        })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while saving new Venue",
                errObj: err
            });
        });
}

exports.getAllVenueNames = async (req, res) => {
    try {
        // Find all venues and select only the 'name' attribute
        const venues = await Venue.findAll();

        // Extract the names from the venue objects

        res.send({ venueNames: venues });
    } catch (err) {
        console.error("Error fetching venue names:", err);
        res.status(500).send({
            message: "An error occurred while fetching venue names",
            errObj: err
        });
    }
};
