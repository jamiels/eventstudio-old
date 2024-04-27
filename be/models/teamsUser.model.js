// models/teams_users.js
module.exports = (sequelize, DataTypes) => {
    const Teams_Users = sequelize.define('teams_users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'teams',
                key: 'id'
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Teams_Users;
};
