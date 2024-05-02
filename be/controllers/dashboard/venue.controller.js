const db = require("../../models");
const Venue = db.venue;


exports.add = (req, res) => {
    const { name, space_id } = req.body;
    if (!name || !space_id) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
    }

    // Create a new venue object with the provided data
    const newVenue = {
        name,
        space_id
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

// delete venue
exports.deleteVenue = async (req, res) => {
    const { id } = req.params;
    try {
        
        const deletedVenue = await Venue.destroy({
            where: {
                id: id
            }
        });
        
        
        if (deletedVenue === 0) {
            res.status(404).send({
                message: `Venue with ID ${id} not found.`
            });
        } else {
            res.send({
                message: `Venue with ID ${id} deleted successfully.`
            });
        }
        
    } catch (err) {
        res.status(500).send({
            message: "An error occurred while deleting Venue",
            errObj: err
        });
    }
};
