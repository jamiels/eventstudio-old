module.exports = (sequelize, Sequelize) => {
    const Producer = sequelize.define("producer", {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Venue name cannot be null
        validate: {
          notEmpty: true // Venue name cannot be empty
        }
      },
      //future venue will be associated with team
    });
  
    return Producer;
  };
  