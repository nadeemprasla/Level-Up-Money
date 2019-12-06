var db = require("../models");
var categories ;
console.log(categories);
var entries ;
module.exports = function(app) {

  app.get("/api", function(req, res) {
    db.User.findAll({}).then(function(data) {
      user = data.username
      res.json(data);
    });
  });

  app.get("/api/allUserInfo/:id", function(req, res) {

    var currentMonth = new Date().getMonth()+1;
    db.Category.findAll({
      where:{
        $and:{
          AllowanceId:currentMonth,
          UserId:req.params.id 

        }
        
      }
    }).then(function(data) {

      var alldata = [];
      var categories =[];
      for(var i=0;i<data.length;i++){
        
        var entries = getEntries(req.params.id,data[i].id);
        
        var entry = [];
        if(entries){
          for(var j=0;j<entries.length;j++){
            entry.push({entry_name:entries[i].entry_name,
              amount:entries[i].amount,
              memo:entries[i].memo,
              amountType:entries[i].amountType})
          }
        }
          categories.push({ category_name:data[i].category_name,entries:entry});
  
      }
      var allowance;
      getAllowance(req.params.id,currentMonth,function(data){
        allowance = data;
       
        if(allowance){
          alldata = {
            total_budget:allowance.total_budget,
            extraIncome:allowance.extra_income,
            monthName:currentMonth,
            categories:categories
        }
        res.render("home",{user:req.user,allData:alldata})
      }
      
      });
      
    });


  });


  app.get("/api/allEntries", function(req, res) {

    db.Entries.findAll({
        where: {
            UserId: req.user.id
        }
    }).then(function(data) {
      
      var result=
        {entries:data,  
          categories:categories}
      res.render("home",{user:req.user,allData:{result:result}})
      
    });
  });

  app.get("/api/allEntries/:category_id/:userid", function(req, res) {

    db.Entries.findAll({
      where:{
        $and:[{CategoryId:req.params.category_id},{UserId:req.params.userid}]
        
      }
    }).then(function(data) {

      console.log(data[0])
      
      
    });
  });

  function getEntries(user_id,category_id){

    db.Entries.findAll({
      where:{
        $and:[{CategoryId:category_id},{UserId:user_id}]
        
      }
    }).then(function(data) {

      return data
      
    });

  }

  function getAllowance(id,currentMonth,cb){
    db.Allowance.findAll({
      where:
      {
        $and:{
          month_name:currentMonth,
          UserId:id
        }
        
    }}).then(function(data){
      console.log("***********")
      console.log(data);
      console.log("***********")
      cb(data);
    })
  }

  

}