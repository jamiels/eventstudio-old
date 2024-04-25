const crypto = require('crypto')
require('dotenv').config()

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      set: function (val) {
        this.setDataValue('username', val.toLowerCase());
      },
      notEmpty: true,
      notNull: true,
      is: /^[a-zA-Z0-9\._]{4,32}$/,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      set: function (val) {
        this.setDataValue('email', val.toLowerCase());
      },
      isEmail: true,
      notEmpty: true,
      notNull: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      get() {
        return () => this.getDataValue('password')
      }
    },
  });


  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = process.env.USER_SALT
      user.password = User.encryptPassword(user.password(), user.salt)
    }
  }

  User.prototype.verifyPassword = function (enteredPassword) {
    return User.encryptPassword(enteredPassword, process.env.USER_SALT) === this.password()
  }

  User.beforeCreate(setSaltAndPassword)
  User.beforeUpdate(setSaltAndPassword)

  return User;
};