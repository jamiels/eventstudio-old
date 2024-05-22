const db = require("../../models");
const Space = db.space;
const SpaceUser = db.space_users;
const User = db.users;
const sgMail = require('@sendgrid/mail');
const generatePasswordResetToken = require('../user.controller');
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
            const newUser = await User.create({ email });
            const token = generatePasswordResetToken(newUser.email);

            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email,
                from: 'no-reply@yourdomain.com',
                subject: 'Create Your Password',
                html: `<p>Please create your password by clicking the link below:</p>
                       <a href="${process.env.FRONTEND_URL}/public/create-password/${token}">Create Password</a>`
            };
            await sgMail.send(msg);

            return res.status(200).send({ message: 'Email sent to create password.' });
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
            include: [{ model: Space, attributes: ['space_name', 'uuid'] }]
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


exports.deleteSpace = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if the space exists
        const space = await Space.findByPk(id);
        if (!space) {
            return res.status(404).send({
                message: `Space with ID ${id} not found.`
            });
        }

        // Delete space-user associations first
        await SpaceUser.destroy({
            where: {
                space_id: id,
                user_id: req.user.id
            }
        });

        // Then delete the space
        await Space.destroy({
            where: {
                id: id
            }
        });

        res.send({
            message: `Space with ID ${id} deleted successfully.`
        });

    } catch (err) {
        console.error("Error deleting Space:", err);
        res.status(500).send({
            message: "An error occurred while deleting Space",
            errObj: err
        });
    }
};
