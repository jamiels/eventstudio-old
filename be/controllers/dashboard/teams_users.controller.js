const db = require("../../models");
const Teams_Users = db.teams_users;

// Set User as Admin of Team
exports.setAdmin = async (req, res) => {
    try {
        const { team_id, user_id } = req.body;

        // Update the user's role to admin
        await Teams_Users.update({ isAdmin: true }, { where: { team_id, user_id } });

        res.send({ success: true, message: 'User role updated to admin successfully.' });
    } catch (err) {
        console.error("Error setting admin:", err);
        res.status(500).send({
            message: "An error occurred while setting admin.",
            errObj: err
        });
    }
};

// Remove User from Team
exports.removeUser = async (req, res) => {
    try {
        const { team_id, user_id } = req.body;

        // Remove the user from the team
        await Teams_Users.destroy({ where: { team_id, user_id } });

        res.send({ success: true, message: 'User removed from team successfully.' });
    } catch (err) {
        console.error("Error removing user from team:", err);
        res.status(500).send({
            message: "An error occurred while removing user from team.",
            errObj: err
        });
    }
};
