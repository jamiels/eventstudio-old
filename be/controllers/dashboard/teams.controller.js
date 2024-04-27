const db = require("../../models");
const Teams = db.teams;
const Teams_Users = db.teams_users;
const User = db.users;

// Create Team
exports.createTeam = async (req, res) => {
    try {
        const { team_name } = req.body;

        // Check if team name is provided
        if (!team_name) {
            return res.status(400).send({
                message: 'Please provide a team name.'
            });
        }

        // Create the team
        const team = await Teams.create({ team_name });

        // Add the current user as the team admin
        await Teams_Users.create({ user_id: req.user.id, team_id: team.id, isAdmin: true });

        res.status(201).send({ success: true, team });
    } catch (err) {
        console.error("Error creating team:", err);
        res.status(500).send({
            message: "An error occurred while creating team.",
            errObj: err
        });
    }
};
exports.addUserToTeam = async (req, res) => {
    try {
        const { email, team_id } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).send({
                message: 'Please provide an email address.'
            });
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({
                message: 'User not found with the provided email address.'
            });
        }

        // Check if the user is an admin of the team
        const teamUser = await Teams_Users.findOne({ where: { user_id: req.user.id, team_id } });

        if (!teamUser || !teamUser.isAdmin) {
            return res.status(403).send({
                message: 'User is not an admin of the team.'
            });
        }
        const alreadyMember = await Teams_Users.findOne({ where: { user_id: user.id, team_id } });
        if (alreadyMember) {
            return res.status(403).send({
                message: 'Already member of this team.'
            });
        }
        // Add the user to the team
        await Teams_Users.create({ user_id: user.id, team_id });

        res.send({ success: true, message: 'User added to team successfully.' });
    } catch (err) {
        console.error("Error adding user to team:", err);
        res.status(500).send({
            message: "An error occurred while adding user to team.",
            errObj: err
        });
    }
};

