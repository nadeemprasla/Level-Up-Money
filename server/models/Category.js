module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    })

 
    Category.associate = function ({Entries}) {
        Category.hasMany(Entries);
    }   

    return Category;
}