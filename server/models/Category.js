module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    })


    Category.associate = function ({ User, Entries, Budget }) {
        Category.hasMany(Entries);
        Category.hasMany(Budget);
        Category.belongsTo(User);

    }

    return Category;
}