module.exports = app => {
    const speaking_requests = require("../controllers/publicForms/speakingRequest.controller");
    const sponsor_onboarding = require("../controllers/publicForms/sponsorBoarding.controller");
    const sponsor_request = require("../controllers/publicForms/sponsorRequest.controller");
    const volunteer = require("../controllers/publicForms/volunteer.controller");

    var router = require("express").Router();
    //speaking_requests
    router.post("/speak/:id", speaking_requests.addSpeakingRequest)
    router.get("/speak/all", speaking_requests.getAllSpeakingRequests)
    router.delete('/speak/:id', speaking_requests.deleteSpeakingRequest);
    //sponsor onboarding
    router.post("/onboard/:id", sponsor_onboarding.addSponsorOnboarding)
    router.get("/onboard/all", sponsor_onboarding.getAllSponsorBoardings)
    router.delete('/onboard/:id', sponsor_onboarding.deleteSponsorOnboarding);
    //sponsor request
    router.post("/sponsor/:id", sponsor_request.addSponsorRequest)
    router.get("/sponsor/all", sponsor_request.getAllSponsorRequests)
    router.delete('/sponsor/:id', sponsor_request.deleteSponsorRequest);
    //volunteer
    router.post("/volunteer/:id", volunteer.addVolunteer)
    router.get("/volunteer/all", volunteer.getAllVolunteers)
    router.delete('/sponvolunteersor/:id', volunteer.deleteVolunteer);
    app.use('/public', router);
};