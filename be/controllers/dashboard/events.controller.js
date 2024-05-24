const db = require("../../models");
const User = db.users;
const Event = db.events;

exports.add = (req, res) => {
    const data = req.body.data;
    const newEvent = {
        user: req.body.userId,
        name: data.name,
        shortname: data.shortName,
        landingUrl: data.landingURL,
        startdate: data.startdate,
        enddate: data.enddate,
        veneue: data.veneue,
        space_id: data.space_id,
        sponsorshipDeckUrl: data.sponsorshipDeckUrl,
        theme: data.theme
    }

    Event.create(newEvent)
        .then(data => {
            res.send({ success: true, event: data });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while save new Event",
                errObj: err
            });
        });
}


exports.get = async (req, res) => {
    try {
        const { spaceId } = req.params;
        if (!spaceId) {
            return res.status(400).send({ message: "spaceId not found." });
        }
        events = await Event.findAll({ where: { space_id: spaceId } });
        res.send({ events: events })
    }
    catch (ex) {
        console.log(ex)
        throw ex;
    }

}


exports.delete = (req, res) => {
    const id = req.body.id;
    console.log(id);

    Event.destroy({ where: { id: id } })
        .then(data => {
            res.send({ success: true });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while save new Event",
                errObj: err
            });
        });
}
exports.getActiveEvents = async (req, res) => {
    try {
        const { spaceId } = req.params;
        events = await Event.findAll({ where: { is_active: true, space_id: spaceId } });
        res.send({ events: events })
    }
    catch (ex) {
        console.log(ex)
        throw ex;
    }

}

exports.updateEvent = async (req, res) => {
    const id = req.params.id;
    const eventData = req.body;

    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).send({ message: "Event not found." });
        }

        const updatedEvent = {
            name: eventData.name,
            shortname: eventData.shortName,
            landingUrl: eventData.landingURL,
            startdate: eventData.startdate,
            enddate: eventData.enddate,
            veneue: eventData.veneue,
            is_active: eventData.is_active,
            space_id: eventData.space_id,
            sponsorshipDeckUrl: eventData.sponsorshipDeckUrl,
            theme: eventData.theme
        };

        await Event.update(updatedEvent, { where: { id: id } });
        res.send({ success: true, event: updatedEvent });
    } catch (err) {
        res.status(500).send({
            message: "Error updating event with id=" + id,
            errObj: err
        });
    }
};


module.exports = exports;