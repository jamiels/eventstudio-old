const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');


async function findUserByUsername(username) {
    try {
        users = await User.findAll({ where: {username: username} })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

async function findUserByEamil(email) {
    try {
        users = await User.findAll({ where: {email: email} })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}


exports.signup = async (req, res) => {
    if(!req.body.username, !req.body.email, !req.body.password) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return;
    }

    if (req.body.email) {
        user = await findUserByEamil(req.body.email);
    }
    if(user == null || !(user instanceof User)) {
        // Create the User Record
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
    
        User.create(newUser)
        .then(data => {
          res.send({
              message: "Signup Successful!"
          });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while signing you up.",
            errObj: err
          });
        });
    } else {
        res.status(400).send({
            message: 'Email is already exist!'
        });
    }
}

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
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Email!"
        });
    } else {
        if(user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Login Successful",
                token: jwt.sign({ id: user.id, email: user.email }, secret),
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
    user = await findUserByUsername(req.user.username);
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if(user.verifyPassword(req.body.oldpassword)) {
            user.update({password: req.body.newpassword}, {
                where: {id: user.id}
            });
            res.status(200).send({
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
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if(user.verifyPassword(req.body.password)) {
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