module.exports = app => {
    const eventsController = require("../controllers/dashboard/events.controller");
    const venueController = require("../controllers/dashboard/venue.controller");
    const orgController = require("../controllers/dashboard/org.controller");

    const { _, auth } = require('../middlewares');

    var router = require("express").Router();

    router.post("/events/add", eventsController.add);

    router.post("/events/get", eventsController.get);

    router.post("/events/delete", eventsController.delete);

    //venue controller
    router.post("/venue/add", venueController.add);

    router.get('/venue/names', venueController.getAllVenueNames);

    //org
    router.post("/org/add", orgController.add);

    router.get('/org/names', orgController.getAllOrgNames);

    app.use('/dashboard', router);
};