const db = require("../models");
const User = db.users;
const Space = db.space;
const SpaceUser = db.space_users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

exports.generatePasswordResetToken = (email) => {
    const token = jwt.sign({ email }, secret, { expiresIn: process.env.expiresIn });
    return token;
}

async function findUserByUsername(username) {
    try {
        users = await User.findAll({ where: { username: username } })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

async function findUserByEamil(email) {
    try {
        users = await User.findAll({ where: { email: email } })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

exports.createPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).send({
                message: 'Please provide all required fields.'
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).send({
                message: 'Token is invalid or has expired.'
            });
        }

        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).send({
                message: 'User not found.'
            });
        }

        user.update({ password: newPassword }, {
            where: { id: user.id }
        });

        // Create the default space
        const space = await Space.create({ space_name: `Default Space` });

        // Add the user as admin to the space
        await SpaceUser.create({ user_id: user.id, space_id: space.id, isAdmin: true });

        res.status(200).send({
            message: 'Password Created successfully.'
        });
    } catch (err) {
        console.error("Error creating password:", err);
        res.status(500).send({
            message: "An error occurred while creating the password.",
            errObj: err
        });
    }
};


exports.signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return;
    }

    try {
        // Check if the email already exists
        const existingUser = await findUserByEamil(req.body.email);
        if (existingUser) {
            return res.status(400).send({
                message: 'Email is already in use.'
            });
        }

        // Create the user
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };
        const user = await User.create(newUser);

        // Create the default space
        const space = await Space.create({ space_name: `Default Space` });

        // Add the user as admin to the space
        await SpaceUser.create({ user_id: user.id, space_id: space.id, isAdmin: true });

        res.status(200).send({
            message: "Signup Successful!"
        });
    } catch (err) {
        console.error("Error signing up user:", err);
        res.status(500).send({
            message: "An error occurred while signing you up.",
            errObj: err
        });
    }
};

exports.login = async (req, res) => {
    console.log(req.body)

    if ((!req.body.username && !req.body.email) || (!req.body.password)) {
        res.status(400).send({
            message: 'Please provide username/email and password.'
        });
    }
    user = null;
    if (req.body.email) {
        user = await findUserByEamil(req.body.email);
    }
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Email!"
        });
    } else {
        if (user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Login Successful",
                token: jwt.sign({ id: user.id, email: user.email, name: user.name }, secret),
                user: user
            })
        } else {
            res.status(403).send({
                message: "Invalid Password!"
            });
        }
    }
}


exports.verifyToken = async (req, res) => {
    console.log(req.body)

    let token = req.body.api_token;

    jwt.verify(token,
        secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }

            res.send(decoded);
        });
}

exports.changepassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.oldpassword || !req.body.newpassword) {
        res.status(400).send({
            message: 'Please provide both old and new password.'
        });
    }
    user = await User.findByPk(req.user.id);
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.oldpassword)) {
            user.update({ password: req.body.newpassword, name: req.body.name ? req.body.name : user?.name }, {
                where: { id: user.id }
            });
            res.status(200).send({
                user,
                message: "Password Updated Successfully!"
            })
        } else {
            res.status(403).send({
                message: "Invalid Old Password! Please recheck."
            });
        }
    }
}

exports.verifypassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.password) {
        res.status(400).send({
            message: 'Please provide your password to re-authenticate.'
        });
    }
    user = await findUserByUsername(req.user.username);
    if (user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if (user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Password Verification Successful!"
            })
        } else {
            res.status(403).send({
                message: "Invalid Password! Please recheck."
            });
        }
    }
}





module.exports = exports;