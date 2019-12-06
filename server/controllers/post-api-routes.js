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

    app.post("/api/addItem", function (req, res) {
        db.Entries.create(req.body).then(function (result) {
            res.json(result)
        });
    });




    app.put("/api/budget", function (req, res) {
console.log(req.body)
        db.Allowance.upsert(req.body, {
            where: {
                $and:
                    [{ UserId: req.body.UserId }, { month_name: req.body.month_name }]
            }
        }).then(function (result) {
            console.log(result)
            res.json(result)
        })

    })

};
