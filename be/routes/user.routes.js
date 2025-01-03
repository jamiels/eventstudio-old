module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const {_, auth} = require('../middlewares');

    var router = require("express").Router();

    router.post("/signup", users.signup);

    router.post("/login", users.login);

    router.post("/verify_token", users.verifyToken);

    router.post("/changepassword", auth, users.changepassword);

    router.post("/verifypassword", auth, users.verifypassword);

    router.post("/create-password", users.createPassword);

    app.use('/user', router);
};