module.exports = app => {
    const speaking_requests = require("../controllers/publicForms/speakingRequest.controller");
    const sponsor_onboarding = require("../controllers/publicForms/sponsorBoarding.controller");
    const sponsor_request = require("../controllers/publicForms/sponsorRequest.controller");

    var router = require("express").Router();
    //speaking_requests
    router.post("/speak/:eventUUID", speaking_requests.addSpeakingRequest)
    //sponsor onboarding
    router.post("/onboard/:eventUUID", sponsor_onboarding.addSponsorOnboarding)
    //sponsor request
    router.post("/sponsor/:eventUUID", sponsor_request.addSponsorRequest)

    app.use('/public', router);
};