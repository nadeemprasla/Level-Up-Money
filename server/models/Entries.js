module.exports = (sequelize, DataTypes) => {
    const Entries = sequelize.define('Entries', {
        entry_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        memo: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        amountType: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    })

    Entries.associate = function ({ Category, User, Allowance }) {
        Entries.belongsTo(Category);
        Entries.belongsTo(User);
        Category.belongsTo(Allowance, {
            onDelete: "SET NULL",
            onUpdate: 'CASCADE',
            targetKey: 'month_name',
            constraints: false
        });
    }

    return Entries;

}