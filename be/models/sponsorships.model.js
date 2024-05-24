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
        contact_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_email_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invoice_person: {
            type: DataTypes.STRING,
            allowNull: false
        },
        invoice_email_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deck_sent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        contract_sent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        invoice_sent: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        payment_received: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        commitment_amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        space_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'space',
              key: 'id'
            }
        },
    });

    // Define associations
    Sponsorship.associate = (models) => {
        Sponsorship.belongsTo(models.Organization, { foreignKey: 'organization_id' });
        Sponsorship.belongsTo(models.Event, { foreignKey: 'event_id' });
    };

    return Sponsorship;
};
