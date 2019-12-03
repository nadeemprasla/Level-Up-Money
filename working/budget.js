module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        budget: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }
    })

    Budget.associate = function ({ Category, User }) {
        Budget.hasMany(Category);
    }

}