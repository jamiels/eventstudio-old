module.exports = app => {
    const speaking_requests = require("../controllers/publicForms/speakingRequest.controller");
    const sponsor_onboarding = require("../controllers/publicForms/sponsorBoarding.controller");
    const sponsor_request = require("../controllers/publicForms/sponsorRequest.controller");

    var router = require("express").Router();
    //speaking_requests
    router.post("/speak/:eventUUID", speaking_requests.addSpeakingRequest)
    router.get("/speak/all", speaking_requests.getAllSpeakingRequests)
    router.delete('/speak/:id', speaking_requests.deleteSpeakingRequest);
    //sponsor onboarding
    router.post("/onboard/:eventUUID", sponsor_onboarding.addSponsorOnboarding)
    router.get("/onboard/all", sponsor_onboarding.getAllSponsorBoardings)
    router.delete('/onboard/:id', sponsor_onboarding.deleteSponsorOnboarding);
    //sponsor request
    router.post("/sponsor/:eventUUID", sponsor_request.addSponsorRequest)
    router.get("/sponsor/all", sponsor_request.getAllSponsorRequests)
    router.delete('/sponsor/:id', sponsor_request.deleteSponsorRequest);

    app.use('/public', router);
};