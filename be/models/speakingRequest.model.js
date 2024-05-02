module.exports = (sequelize, DataTypes) => {
    const SpeakingRequest = sequelize.define('speaking_request', {
        eventUUID: {
            type: DataTypes.UUID,
            allowNull: true
        },
        spaceUUID: {
            type: DataTypes.UUID,
            allowNull: true
        },
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
            allowNull: true
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
        }
    });

    return SpeakingRequest;
};
