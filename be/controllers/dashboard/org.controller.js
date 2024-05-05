const db = require("../../models");
const Org = db.organization;


exports.add = (req, res) => {
    const { name, space_id } = req.body;
    if (!name || !space_id) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
    }

    // Create a new venue object with the provided data
    const newOrg = {
        name,
        space_id: space_id, //spaceid

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
        const { spaceId } = req.params;
        // Find all venues and select only the 'name' attribute
        const orgNames = await Org.findAll({ where: { space_id: spaceId } });

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
// delete organization
exports.deleteOrganization = async (req, res) => {
    const { id } = req.params;
    try {

        const deletedOrganization = await Org.destroy({
            where: {
                id: id
            }
        });


        if (deletedOrganization === 0) {
            res.status(404).send({
                message: `Organization with ID ${id} not found.`
            });
        } else {
            res.send({
                message: `Organization with ID ${id} deleted successfully.`
            });
        }

    } catch (err) {
        res.status(500).send({
            message: "An error occurred while deleting organization",
            errObj: err
        });
    }
};

exports.updateOrg = async (req, res) => {
    const id = req.params.id;
    const orgData = req.body;
    try {
        const organization = await Org.findByPk(id);
        if (!organization) {
            return res.status(404).send({ message: "Organization not found." });
        }

        await Org.update(orgData, { where: { id: id } });
        res.send({ success: true, organization: orgData });
    } catch (err) {
        console.log("🚀 ~ exports.updateOrg= ~ err:", err)
        res.status(500).send({
            message: "Error updating organization with id=" + id,
            errObj: err
        });
    }
};
