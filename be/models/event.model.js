module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
    },
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
    team: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id'
      }
    }
  });

  return Event;
};
