module.exports = (sequelize, DataTypes) => {
    const SpeakerOnboarding = sequelize.define('speaker_onboarding', {
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
        bio: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        eventName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        linkedInURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        twitterURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        headshotURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        organization: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return SpeakerOnboarding;
};
