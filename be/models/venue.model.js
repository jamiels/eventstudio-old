module.exports = (sequelize, Sequelize) => {
    const Venue = sequelize.define("venue", {
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Venue name cannot be null
        validate: {
          notEmpty: true // Venue name cannot be empty
        }
      },
      //future venue will be associated with team
    });
  
    return Venue;
  };
  