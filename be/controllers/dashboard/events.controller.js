const db = require("../../models");
const User = db.users;
const Event = db.events;

const Op = db.Sequelize.Op;
const where = db.Sequelize.where;

exports.add = (req, res) => {
    const data = req.body.data;
    console.log(data);

    const newEvent = {
        user: req.body.userId,
        name: data.name,
        shortname: data.shortName,
        landingUrl: data.landingURL,
        startdate: data.startdate,
        enddate: data.enddate,
        veneue: data.veneue,
    }

    Event.create(newEvent)
    .then(data => {
        res.send({success: true});
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
        events = await Event.findAll();
        res.send({events: events})
    }
    catch (ex) {
        console.log(ex)
        throw ex;
    }
    
}


exports.delete = (req, res) => {
    const id = req.body.id;
    console.log(id);

    Event.destroy({where :{id: id}})
    .then(data => {
        res.send({success: true});
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while save new Event",
          errObj: err
        });
    });
}


module.exports = exports;