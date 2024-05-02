module.exports = (sequelize, DataTypes) => {
    const Space = sequelize.define('space', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        space_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Default Space'
        }
    }, {
        tableName: 'space' 
    });

    return Space;
};
