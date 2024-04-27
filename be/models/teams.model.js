module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define('teams', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'User Team'
        }
    });

    return Teams;
};
