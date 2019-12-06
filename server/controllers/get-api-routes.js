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

  app.get("/allCategories", function(req, res) {
    db.Category.findAll({}).then(function(data) {
      categories=data
      var allData = {
        categories:categories
      }
      res.render("home",{user:req.user,allData:allData});
    });


  });


  app.get("/api/allEntries", function(req, res) {

    db.Entries.findAll({}).then(function(data) {
      
      //console.log(data);

      var result=
        {entries:data,
          categories:categories}
      
      
      res.render("home",{user:req.user,allData:{result:result}})
      
    });
  });

}