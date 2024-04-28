module.exports = app => {
    const eventsController = require("../controllers/dashboard/events.controller");
    const venueController = require("../controllers/dashboard/venue.controller");
    const orgController = require("../controllers/dashboard/org.controller");
    const sponsorshipsController = require("../controllers/dashboard/sponsorships.controller");
    const producerController = require("../controllers/dashboard/producer.controller");
    const speakersController = require("../controllers/dashboard/speakers.controller");
    const teamsController = require("../controllers/dashboard/teams.controller");

    const { _, auth } = require('../middlewares');

    var router = require("express").Router();

    router.post("/events/add", eventsController.add);

    router.post("/events/get", eventsController.get);

    router.post("/events/delete", eventsController.delete);

    //venue controller
    router.post("/venue/add", venueController.add);

    router.get('/events/getvenues', venueController.getAllVenueNames);
    router.delete('/venue/delete/:id', venueController.deleteVenue);

    //org
    router.post("/org/add", orgController.add);

    router.get('/org/names', orgController.getAllOrgNames);
    router.delete('/org/delete/:id', orgController.deleteOrganization);

    // sponsorships
    router.post('/sponserships/add', sponsorshipsController.addSponsorship);
    router.get('/sponserships/get/:id', sponsorshipsController.getSponsorship);
    router.delete('/sponserships/del/:id', sponsorshipsController.deleteSponsorship);
    router.get('/sponserships/all', sponsorshipsController.getAllSponsorships);
    //producer
    router.post('/producer/add', producerController.add);
    router.get('/producer/names', producerController.getAllProducerNames);
    router.delete('/producer/del/:id', producerController.deleteProducer);
    //speakers
    router.post('/speakers/add', speakersController.addSpeaker);
    router.get('/speakers/names', speakersController.getAllSpeakers);
    router.delete('/speakers/del/:id', speakersController.deleteSpeaker);
    //teams
    router.post('/teams/add', auth, teamsController.createTeam);
    router.post('/teams/addUser', auth, teamsController.addUserToTeam);
    router.get('/teams/userteams', auth, teamsController?.getUserTeams)
    app.use('/dashboard', router);
};