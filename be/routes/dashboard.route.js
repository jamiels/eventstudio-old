module.exports = app => {
    const eventsController = require("../controllers/dashboard/events.controller");
    const venueController = require("../controllers/dashboard/venue.controller");
    const orgController = require("../controllers/dashboard/org.controller");
    const sponsorshipsController = require("../controllers/dashboard/sponsorships.controller");
    const producerController = require("../controllers/dashboard/producer.controller");
    const speakersController = require("../controllers/dashboard/speakers.controller");
    const spaceController = require("../controllers/dashboard/space.controller"); // assuming you have a controller for space operations

    const { _, auth } = require('../middlewares');

    var router = require("express").Router();

    router.post("/events/add", eventsController.add);

    router.post("/events/get/:spaceId", eventsController.get);
    router.get("/events/active/:spaceId", eventsController.getActiveEvents);
    router.put("/events/update/:id", eventsController.updateEvent);

    router.post("/events/delete", eventsController.delete);

    //venue controller
    router.post("/venue/add", venueController.add);
    router.put("/venue/update/:id", venueController.updateVenue);
    router.get('/events/getvenues/:spaceId', venueController.getAllVenueNames);
    router.delete('/venue/delete/:id', venueController.deleteVenue);

    //org
    router.post("/org/add", orgController.add);
    router.put("/org/update/:id", orgController.updateOrg);
    router.get("/org/active/:spaceId", orgController.getActiveOrgs);
    router.get('/org/names/:spaceId', orgController.getAllOrgNames);
    router.delete('/org/delete/:id', orgController.deleteOrganization);

    // sponsorships
    router.post('/sponserships/add', sponsorshipsController.addSponsorship);
    router.put('/sponserships/update/:id', sponsorshipsController.updateSponsorship);
    router.get('/sponserships/get/:id', sponsorshipsController.getSponsorship);
    router.delete('/sponserships/del/:id', sponsorshipsController.deleteSponsorship);
    router.get('/sponserships/all/:spaceId', sponsorshipsController.getAllSponsorships);
    router.get('/sponserships/events/:eventId', sponsorshipsController.getAllSponsorshipsEventDetail);

    
    //producer
    router.post('/producer/add', producerController.add);
    router.get('/producer/names/:spaceId', producerController.getAllProducerNames);
    router.delete('/producer/del/:id', producerController.deleteProducer);
    router.put('/producer/update/:id', producerController.updateProducer);

    //speakers
    router.post('/speakers/add', speakersController.addSpeaker);
    router.get('/speakers/names/:spaceId', speakersController.getAllSpeakers);
    router.put('/speakers/update/:id', speakersController.updateSpeaker);
    router.delete('/speakers/del/:id', speakersController.deleteSpeaker);
    router.get('/speakers/events/:eventId', speakersController.getAllSpeakersEventDetail);

    //teams
    router.post('/space/add', auth, spaceController.createSpace); // Assuming createSpace is for creating a team/space
    router.post('/space/addUser', auth, spaceController.addUserToSpace); // Assuming addUserToSpace is for adding a user to a team/space
    router.get('/space/userspace', auth, spaceController.getUserSpaces); // Assuming getUserSpaces is for getting user's teams/spaces
    router.delete('/space/:id', auth, spaceController.deleteSpace); // Assuming getUserSpaces is for getting user's teams/spaces
    router.put('/space/update/:id', auth, spaceController.updateSpace);
    router.get('/space/getAllUsers/:space_id', auth, spaceController.getAllUsersCurrentSpace);


    app.use('/dashboard', router);
};
