module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('volunteer', {
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    mobilePhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    communicationTools: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    telegramID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedInURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    areasOfSupport: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    businessAttire: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Volunteer;
};
