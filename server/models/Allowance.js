module.exports = (sequelize, DataTypes) => {
    const Allowance = sequelize.define('Allowance',{
        month_name:{
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
        total_budget:{
            type: DataTypes.DECIMAL(10,2),
            allowNull:false
          },
          extra_income:{
            type: DataTypes.DECIMAL(10,2),
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
    Allowance.associate = function({ User ,Category,Entries}) {
        Allowance.belongsTo(User);
        Allowance.hasMany(Category,{
            sourceKey: 'month_name', constraints: false
        });
        Allowance.hasMany(Entries,{
            sourceKey: 'month_name', constraints: false
        });
    }

    return Allowance;
}