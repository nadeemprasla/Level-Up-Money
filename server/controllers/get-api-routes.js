var db = require("../models");
var allowance;
var userInfo;
module.exports = function (app) {

    app.get("/api", function (req, res) {
        db.User.findAll({}).then(function (data) {
            user = data.username
            res.json(data);
        });
    });

    app.get("/api/:id/:month", function (req, res) {
        userInfo = req.user;
        var month = req.params.month
        var userId = req.params.id
        db.Allowance.findOne({
            where: {
                $and: {
                    month_name: month,
                    UserId: userId
                }

            },
            raw: true,
        }).then((data) => {

            allowance = data
            getCategories(userId, month, res)

        })
    })

    function getCategories(userId, month, res) {

        db.Category.findAll({
            where: {
                $and: {
                    AllowanceId: month,
                    UserId: userId
                }
            },
            raw: true,
            include: [db.Entries]
        }).then((data) => {

            allData = [];
            data.map((e) => {
                catUpperCase = e.category_name.toLowerCase()
                catUpperCase = catUpperCase.charAt(0).toUpperCase() + catUpperCase.slice(1)
                if (e["Entries.entry_name"]) {

                    entryUpperCase = e["Entries.entry_name"];
                    entryUpperCase = entryUpperCase.toLowerCase();
                    entryUpperCase = entryUpperCase.charAt(0).toUpperCase() + entryUpperCase.slice(1)
                    allData.push({
                        "category_id": e.id,
                        "category_name": catUpperCase,
                        "category_amount": e.category_amount,
                        "entry_id": e["Entries.id"],
                        "entry_name": entryUpperCase,
                        "amount": e["Entries.amount"],
                        "memo": e["Entries.memo"],
                        "amountType": e["Entries.amountType"]
                    })
                }

            })

            getEnteries(userId, month, res)

        }
        )
    }

    function getEnteries(user, month, res) {

        db.Category.findAll({
            where: {

                $and: {
                    AllowanceId: month,
                    UserId: user
                }

            },
            raw: true
        }).then((data) => {
            category = [];
            data.map((e) => {
                upperit = e.category_name.toLowerCase()
                upperit = upperit.charAt(0).toUpperCase() + upperit.slice(1)
                category.push({
                    "id": e.id,
                    "category_name": upperit,
                    "category_amount": e.category_amount,
                })
            })

            res.render('home', {
                user: userInfo,
                alldata: allData,
                category: category,
                allowance: allowance,
                currentMonth: month
            })

        })

    }

    app.get("/home", function (req, res) {
        res.render('home', { user: "" });
    })


    app.get('/chart/:id/:month', function (req, res) {
        console.log("reqbody        ", req.params.id, req.params.month);
        db.Category.findAll({
            where: {
                $and: {
                    AllowanceId: req.params.month,
                    UserId: req.params.id
                }
            },
            raw: true,
            include: [db.Entries]
        }).then((data) => {
            chartLabel = [];
            chartName= {};
            chartData={};
            data.map((e) => {
                console.log("entry",e)
                console.log(e.id)
                console.log(e['Entries.entry_name'])
                if(chartLabel.includes(e.category_name)) {
                    console.log("its there")
                }
                else{
                    // catUpperCase = e.category_name.toLowerCase()
                    // catUpperCase = catUpperCase.charAt(0).toUpperCase() + catUpperCase.slice(1)    
                    chartLabel.push(e.category_name);
                    console.log("added")}
                if(chartName.hasOwnProperty(e.category_name)) {
                    chartName[e.category_name].push(e['Entries.entry_name'])
                    chartName[e.category_name + "Price"].push(e['Entries.amount'])
                }
                else{
                    chartName[e.category_name] = [e['Entries.entry_name']]
                    chartName[e.category_name + "Price"] = [e['Entries.amount']]
                }
                // if(chartData.hasOwnProperty(e['Entries.entry_name'])) {
                //     chartData[e['Entries.entry_name']] = e['Entries.amount']
                // }
                // else{
                //     chartData[e['Entries.entry_name']] = e['Entries.amount']
                // }
            })
            console.log(chartLabel)
            console.log(chartName);
            // console.log(chartData);
            res.json({chartLabel,chartName})
        })
    }
    )
}
