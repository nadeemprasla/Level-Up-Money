module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

 
    Category.associate = function ({Entries, Budget}) {
        Category.hasMany(Entries);
        Category.hasMany(Budget);

    }   

    return Category;
}