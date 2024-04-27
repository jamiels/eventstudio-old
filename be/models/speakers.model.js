module.exports = (sequelize, DataTypes) => {
    const Speakers = sequelize.define('Speakers', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
        primaryAffiliation: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        headshot: {
            type: DataTypes.STRING,
        },
        linkedInURL: {
            type: DataTypes.STRING,
        },
        twitterURL: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        adminFullName: {
            type: DataTypes.STRING,
        },
        adminEmailAddress: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        }
    });

    return Speakers;
};
