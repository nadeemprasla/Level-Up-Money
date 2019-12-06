module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

 
    Category.associate = function ({Entries, Budget,User,Allowance}) {
        Category.hasMany(Entries);
        Category.hasMany(Budget);
        Category.belongsTo(User);
        Category.belongsTo(Allowance,{
            onDelete: "SET NULL",
            onUpdate:'CASCADE',
            targetKey:'month_name',
            constraints: false});

    }   

    return Category;
}