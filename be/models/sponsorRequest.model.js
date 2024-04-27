module.exports = (sequelize, DataTypes) => {
    const SponsorRequest = sequelize.define('SponsorRequest', {
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
        },
        eventUUID: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });

    return SponsorRequest;
};
