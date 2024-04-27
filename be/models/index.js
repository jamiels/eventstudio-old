const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.connection = sequelize;

db.users = require('./user.model.js')(db.connection, db.Sequelize)
db.events = require('./event.model.js')(db.connection, db.Sequelize)
db.venue = require('./venue.model.js')(db.connection, db.Sequelize)
db.organization = require('./org.model.js')(db.connection, db.Sequelize)
db.sponsorships = require('./sponsorships.model.js')(db.connection, db.Sequelize)

//association of relationships
db.events.hasOne(db.sponsorships, { foreignKey: 'event_id' });
db.sponsorships.belongsTo(db.events, { foreignKey: 'event_id' })
db.organization.hasOne(db.sponsorships, { foreignKey: 'organization_id' });
db.sponsorships.belongsTo(db.organization, { foreignKey: 'organization_id' });


module.exports = db;