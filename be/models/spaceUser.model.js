// models/teams_users.js
module.exports = (sequelize, DataTypes) => {
    const Space_Users = sequelize.define('space_users', {
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
        space_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'space',
                key: 'id'
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    return Space_Users;
};
