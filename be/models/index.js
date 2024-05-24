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

db.space = require('./space.model.js')(db.connection, db.Sequelize)
db.space_users = require('./spaceUser.model.js')(db.connection, db.Sequelize)
db.users = require('./user.model.js')(db.connection, db.Sequelize)
db.events = require('./event.model.js')(db.connection, db.Sequelize)
db.venue = require('./venue.model.js')(db.connection, db.Sequelize)
db.organization = require('./org.model.js')(db.connection, db.Sequelize)
db.sponsorships = require('./sponsorships.model.js')(db.connection, db.Sequelize)
db.producer = require('./producer.model.js')(db.connection, db.Sequelize)
db.speakers = require('./speakers.model.js')(db.connection, db.Sequelize)
db.speaking_request = require('./speakingRequest.model.js')(db.connection, db.Sequelize)
db.speaker_onboarding = require('./speakerOnBoarding.model.js')(db.connection, db.Sequelize)
db.sponsor_request = require('./sponsorRequest.model.js')(db.connection, db.Sequelize)
db.volunteer = require('./volunteer.model.js')(db.connection, db.Sequelize)


//association of relationships
db.events.hasOne(db.sponsorships, { foreignKey: 'event_id' });
db.sponsorships.belongsTo(db.events, { foreignKey: 'event_id' })
db.organization.hasOne(db.sponsorships, { foreignKey: 'organization_id' });
db.sponsorships.belongsTo(db.organization, { foreignKey: 'organization_id' });
// Space-Users Associations
db.space_users.belongsTo(db.space, { foreignKey: 'space_id' });
db.space.hasMany(db.space_users, { foreignKey: 'space_id' });

db.space_users.belongsTo(db.users, { foreignKey: 'user_id' });
db.users.hasMany(db.space_users, { foreignKey: 'user_id' });

module.exports = db;