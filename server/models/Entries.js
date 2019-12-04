module.exports = (sequelize, DataTypes) => {
    const Entries = sequelize.define('Entries', {
        entry_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        memo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    })

    Entries.associate = function ({Category, User}) {
        Entries.belongsTo(Category);
        Entries.belongsTo(User);
    }

    return Entries;
    
}