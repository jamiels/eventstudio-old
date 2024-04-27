// Sponsorship Model
module.exports = (sequelize, DataTypes) => {
    const Sponsorship = sequelize.define('sponsorships', {
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deckSent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        commitmentAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    });

    // Define associations
    Sponsorship.associate = (models) => {
        Sponsorship.belongsTo(models.Organization, { foreignKey: 'organization_id'});
        Sponsorship.belongsTo(models.Event, { foreignKey: 'event_id'});
    };

    return Sponsorship;
};
