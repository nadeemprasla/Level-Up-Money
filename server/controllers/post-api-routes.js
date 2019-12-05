var db = require("../models");

module.exports = function (app) {

    app.get("/api/category", function (req, res) {
        db.Category.findAll({}).then(function (data) {
            console.log(data)
            res.json(data)
        });
    });

    app.post("/api/category/posts", function (req, res) {
        db.Category.create(req.body).then(function (dbPost) {
            res.json(dbPost);
            app.post("/api/addItem", function (req, res) {

                db.Entries.create(req.body).then(function (result) {

                    res.json(result);


                });
            });
        })
    })

    app.post("/api/addItem", function(req, res) {
        db.Entries.create(req.body).then(function(result) {
            res.json(result)
        });
      });

}