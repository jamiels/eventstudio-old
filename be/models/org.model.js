module.exports = (sequelize, Sequelize) => {
    const organization = sequelize.define("organization", {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Venue name cannot be null
        validate: {
          notEmpty: true // Venue name cannot be empty
        }
      },
      space_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'space',
          key: 'id'
        }
      },
    });
  
    return organization;
  };
  