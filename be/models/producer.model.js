module.exports = (sequelize, Sequelize) => {
    const Producer = sequelize.define("producer", {
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
      //future venue will be associated with team
    });
  
    return Producer;
  };
  