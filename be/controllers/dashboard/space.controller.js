const db = require("../../models");
const Space = db.space;
const SpaceUser = db.space_users;
const User = db.users;
const sgMail = require('@sendgrid/mail');
const { generatePasswordResetToken } = require('../user.controller');
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
        const { name, email, space_id } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).send({
                message: 'Please provide an email address.'
            });
        }

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const newUser = await User.create({ email, name });
            const token = generatePasswordResetToken(newUser.email);
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: email,
                from: 'i@jamiel.net',
                subject: 'Create Your Password',
                html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Create Your Password</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            color: #333;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                            border-radius: 8px;
                            overflow: hidden;
                        }
                        .header {
                            background-color: #4CAF50;
                            color: white;
                            text-align: center;
                            padding: 20px 0;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content p {
                            font-size: 16px;
                            line-height: 1.5;
                        }
                        .content a {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            text-decoration: none;
                            border-radius: 4px;
                        }
                        .footer {
                            text-align: center;
                            padding: 10px 20px;
                            background-color: #f4f4f4;
                            color: #777;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Event Studio</h1>
                        </div>
                        <div class="content">
                            <p>Hello,</p>
                            <p>Please create your password by clicking the link below:</p>
                            <a href="${process.env.Frontend_URL}/public/create-password/${token}">Create Password</a>
                        </div>
                        <div class="footer">
                            <p>&copy; ${new Date().getFullYear()} Event Studio. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
                `
            };
            console.log("URL for testing", `${process.env.Frontend_URL}/public/create-password/${token}`)
            // Add the user to the space
            await SpaceUser.create({ user_id: newUser.id, space_id });

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
            include: [{ model: Space, attributes: ['space_name', 'uuid', 'id'] }]
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

// Update Space
exports.updateSpace = async (req, res) => {
    const { id } = req.params; // Space ID from the URL params
    const { space_name } = req.body; // New space name from the request body

    try {
        // Check if space name is provided
        if (!space_name) {
            return res.status(400).send({
                message: 'Please provide a new space name.'
            });
        }

        // Check if the space exists
        const space = await Space.findByPk(id);
        if (!space) {
            return res.status(404).send({
                message: `Space with ID ${id} not found.`
            });
        }

        // Check if the user is an admin of the space
        const spaceUser = await SpaceUser.findOne({ where: { user_id: req.user.id, space_id: id } });

        if (!spaceUser || !spaceUser.isAdmin) {
            return res.status(403).send({
                message: 'User is not an admin of the space.'
            });
        }

        // Update the space name
        space.space_name = space_name;
        await space.save();
        // Find spaces associated with the user
        const updatedSpace = await SpaceUser.findOne({
            where: { user_id: req.user.id, space_id: space.id },
            include: [{ model: Space, attributes: ['space_name', 'uuid', 'id'] }]
        });
        res.status(200).send({ success: true, message: 'Space name updated successfully.', space: updatedSpace });
    } catch (err) {
        console.error("Error updating space:", err);
        res.status(500).send({
            message: "An error occurred while updating the space.",
            errObj: err
        });
    }
};



// Get all users in the current space, ensuring requester is an admin
exports.getAllUsersCurrentSpace = async (req, res) => {
    try {
        const { space_id } = req.params;
        if (!space_id) {
            return res.status(400).send({ error: 'spaceId is required' });
        }
        const user_id = req.user.id;

        // Verify the space exists
        const space = await Space.findByPk(space_id);
        if (!space) {
            return res.status(404).send({ message: "Space not found." });
        }

        // Verify the requester is an admin of the space
        const adminCheck = await SpaceUser.findOne({
            where: { space_id, user_id, isAdmin: true }
        });
        if (!adminCheck) {
            return res.status(403).send({ message: "Not authorized. Admin access required." });
        }

        // Fetch all users in the space, excluding the requester
        const spaceUsers = await SpaceUser.findAll({
            where: { space_id },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });

        // Filter out the current user from the response
        const users = spaceUsers
            // .filter(spaceUser => spaceUser.user_id !== user_id)
            .map(spaceUser => ({
                id: spaceUser.user.id,
                name: spaceUser.user.name,
                email: spaceUser.user.email
            }));

        res.send(users);
    } catch (err) {
        console.error("Error fetching users for space:", err);
        res.status(500).send({
            message: "An error occurred while fetching users for space.",
            errObj: err
        });
    }
};