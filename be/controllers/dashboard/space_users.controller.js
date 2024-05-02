const db = require("../../models");
const SpaceUser = db.space_user; // Assuming this is your new model for space_user
const Space = db.space; // Assuming this is your new model for space

// Set User as Admin of Space
exports.setAdmin = async (req, res) => {
    try {
        const { space_id, user_id } = req.body;

        // Get the space
        const space = await Space.findByPk(space_id);
        if (!space) {
            return res.status(404).send({ message: "Space not found." });
        }

        // Update the user's role to admin for this space
        await SpaceUser.update({ isAdmin: true }, { where: { space_id, user_id } });

        res.send({ success: true, message: 'User role updated to admin for the space successfully.' });
    } catch (err) {
        console.error("Error setting admin for space:", err);
        res.status(500).send({
            message: "An error occurred while setting admin for space.",
            errObj: err
        });
    }
};

// Remove User from Space
exports.removeUser = async (req, res) => {
    try {
        const { space_id, user_id } = req.body;

        // Remove the user from the space
        await SpaceUser.destroy({ where: { space_id, user_id } });

        res.send({ success: true, message: 'User removed from space successfully.' });
    } catch (err) {
        console.error("Error removing user from space:", err);
        res.status(500).send({
            message: "An error occurred while removing user from space.",
            errObj: err
        });
    }
};
