module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    name: {
      type: Sequelize.STRING,
      notEmpty: true,
      notNull: true
    },
    shortname: {
      type: Sequelize.STRING,
    },
    landingUrl: {
      type: Sequelize.STRING,
    },
    startdate: {
      type: Sequelize.STRING,
    },
    enddate: {
      type: Sequelize.STRING,
    },
    veneue: {
      type: Sequelize.INTEGER,
    },
    user: {
      type: Sequelize.INTEGER,
    },
  });


  return Event;
};