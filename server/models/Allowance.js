module.exports = (sequelize, DataTypes) => {
    const Allowance = sequelize.define('Allowance',{
        month_name:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        total_budget:{
            type: DataTypes.DECIMAL(8,4),
            allowNull:false
          },
          extra_income:{
            type: DataTypes.DECIMAL(8,4),
            allowNull:true
          }   
    }
    ,
    {
        indexes: [
            {
                unique: true,
                fields: ['UserId', 'month_name']
            },
            {
                unique:false,
                fields:['month_name']
            }

        ]
    
    });
    Allowance.associate = function({ User ,Category}) {
        Allowance.belongsTo(User);
        Allowance.hasMany(Category,{
            sourceKey: 'month_name', constraints: false
        });
    }

    return Allowance;
}