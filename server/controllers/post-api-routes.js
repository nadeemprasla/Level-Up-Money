var db = require("../models");

module.exports = function(app) {

  app.get("/api/category", function(req, res) {
    db.Category.findAll({}).then(function(data) {
        console.log(data)
        res.json(data)
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

  app.post("/api/category/posts", function(req, res) {
    db.Category.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

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
