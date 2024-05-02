const db = require("../../models");
const Space = db.space;
const SpaceUser = db.space_users;
const User = db.users;

// Create Space
exports.createSpace = async (req, res) => {
    try {
        const { space_name } = req.body;

        // Check if space name is provided
        if (!space_name) {
            return res.status(400).send({
                message: 'Please provide a space name.'
            });
        }

        // Create the space
        const space = await Space.create({ space_name });

        // Add the current user as the admin of the space
        await SpaceUser.create({ user_id: req.user.id, space_id: space.id, isAdmin: true });

        res.status(201).send({ success: true, space, message: "Space Created Successfully." });
    } catch (err) {
        console.error("Error creating space:", err);
        res.status(500).send({
            message: "An error occurred while creating space.",
            errObj: err
        });
    }
};

exports.addUserToSpace = async (req, res) => {
    try {
        const { email, space_id } = req.body;

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

        // Check if the user is an admin of the space
        const spaceUser = await SpaceUser.findOne({ where: { user_id: req.user.id, space_id } });

        if (!spaceUser || !spaceUser.isAdmin) {
            return res.status(403).send({
                message: 'User is not an admin of the space.'
            });
        }

        const alreadyMember = await SpaceUser.findOne({ where: { user_id: user.id, space_id } });
        if (alreadyMember) {
            return res.status(403).send({
                message: 'Already a member of this space.'
            });
        }

        // Add the user to the space
        await SpaceUser.create({ user_id: user.id, space_id });

        res.send({ success: true, message: 'User added to space successfully.' });
    } catch (err) {
        console.error("Error adding user to space:", err);
        res.status(500).send({
            message: "An error occurred while adding user to space.",
            errObj: err
        });
    }
};

exports.getUserSpaces = async (req, res) => {
    try {
        // Find spaces associated with the user
        const userSpaces = await SpaceUser.findAll({
            where: { user_id: req.user.id },
            include: [{ model: Space, attributes: ['space_name'] }]
        });

        // Extract space names from the result

        res.status(200).send({ success: true, userSpaces });
    } catch (err) {
        console.error("Error fetching user spaces:", err);
        res.status(500).send({
            message: "An error occurred while fetching user spaces.",
            errObj: err
        });
    }
};
