var db = require("../models");

module.exports = function(app) {

  app.get("/api", function(req, res) {
    db.User.findAll({}).then(function(data) {
      res.json(data);
    });
  });

//   app.get("/api/posts/:id", function(req, res) {
//     db.Post.findOne({
//       where: {
//         id: req.params.id
//       },
//       include: [db.Author]
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

  app.post("/api/addItem", function(req, res) {

    db.Entries.create(req.body).then(function(result) {
      
        res.json(result);
     
      
    });
  });

  app.post("/api/addCategory",function(req,res){
    console.log("###########")
    db.Category.create(req.body).then(function(result){
      res.json(result)
    })
  })

  // app.post("/api/budget",function(req,res){

  //   db.Allowance.create({total_budget:req.body.budget,UserId:req.body.UserId}
       
  //   ).then(function (result) {
  //     res.json(result)
  //   })

  // })

  app.put("/api/budget",function(req,res){

    db.Allowance.upsert(req.body,{
      where:{
        $and:
        [{UserId:req.body.UserId}, { month_name:req.body.month_name}]
      }
    }).then(function (result) {
      res.json(result)
    })

  })

//   app.delete("/api/posts/:id", function(req, res) {
//     db.Post.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });

//   app.put("/api/posts", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbPost) {
//       res.json(dbPost);
//     });
//   });


};
