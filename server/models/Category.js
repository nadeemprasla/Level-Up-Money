module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_amount: {
            type: DataTypes.DECIMAL(8,4),
            allowNull:true
          
        }
    })


    Category.associate = function ({ Entries, User, Allowance }) {
        Category.hasMany(Entries);
        Category.belongsTo(User);
        Category.belongsTo(Allowance, {
            onDelete: "SET NULL",
            onUpdate: 'CASCADE',
            targetKey: 'month_name',
            constraints: false
        });

    }

    return Category;
}