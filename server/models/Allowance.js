module.exports = (sequelize, DataTypes) => {
    const Allowance = sequelize.define('Allowance',{
        month_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total_budget:{
            type: DataTypes.DECIMAL(8,4),
            allowNull:false
          },
          extra_income:{
            type: DataTypes.DECIMAL(8,4),
            allowNull:true
          }   
    },{
        indexes: [
            {
                unique: true,
                fields: ['UserId', 'month_name']
            }
        ]
      });
    Allowance.associate = function({ User }) {
        Allowance.belongsTo(User);
    }

    return Allowance;
}