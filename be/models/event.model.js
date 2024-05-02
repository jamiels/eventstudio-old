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
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    space_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'space',
        key: 'id'
      }
    },
    sponsorshipDeckUrl: {
      type: Sequelize.STRING, // Assuming it's a URL field
    },
    theme: {
      type: Sequelize.STRING(30), // Max length of 30 characters for the theme
    }
  });

  return Event;
};
