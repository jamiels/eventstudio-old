module.exports = (sequelize, DataTypes) => {
    const SponsorRequest = sequelize.define('sponsor_request', {
        eventUUID: {
            type: DataTypes.UUID,
            allowNull: true
        },
        spaceUUID: {
            type: DataTypes.UUID,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        involvement: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        linkedIn: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return SponsorRequest;
};
