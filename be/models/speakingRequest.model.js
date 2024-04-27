module.exports = (sequelize, DataTypes) => {
    const SpeakingRequest = sequelize.define('SpeakingRequest', {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        panelists: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        abstract: {
            type: DataTypes.STRING,
            allowNull: false
        },
        linkedInURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sponsorshipInterest: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventUUID: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });

    return SpeakingRequest;
};
