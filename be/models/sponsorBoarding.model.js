// models/sponsor_onboarding.js
module.exports = (sequelize, DataTypes) => {
    const SponsorOnboarding = sequelize.define('SponsorOnboarding', {
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
        },
        eventUUID: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });

    return SponsorOnboarding;
};
