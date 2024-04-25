module.exports = app => {
    const eventsController = require("../controllers/dashboard/events.controller");
    const {_, auth} = require('../middlewares');

    var router = require("express").Router();

    router.post("/events/add", eventsController.add);

    router.post("/events/get", eventsController.get);

    router.post("/events/delete", eventsController.delete);


    app.use('/dashboard', router);
};