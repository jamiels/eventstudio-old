module.exports = app => {
    const speaking_requests = require("../controllers/publicForms/speakingRequest.controller");
    const speaker_onboarding = require("../controllers/publicForms/speakerOnBoarding.controller");
    const sponsor_request = require("../controllers/publicForms/sponsorRequest.controller");
    const volunteer = require("../controllers/publicForms/volunteer.controller");
    const upload = require("../utils/multer");
    var router = require("express").Router();
    //speaking_requests
    router.post("/speak/:id", speaking_requests.addSpeakingRequest)
    router.get("/speak/all", speaking_requests.getAllSpeakingRequests)
    router.delete('/speak/:id', speaking_requests.deleteSpeakingRequest);
    //sponsor onboarding
    router.post("/onboard/:id", upload.single('headshot'), speaker_onboarding.addSpeakerOnboarding)
    router.get("/onboard/all", speaker_onboarding.getAllSpeakerOnboardings)
    router.delete('/onboard/:id', speaker_onboarding.deleteSpeakerOnboarding);
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