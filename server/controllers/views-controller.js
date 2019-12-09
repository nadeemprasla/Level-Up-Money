const express = require('express');
const router = express.Router();

const db = require('../models')
let allData;
let category;
let user;
let allowance;
var currentMonth = new Date().getMonth() + 1;

router.get('/', (req, res) => {
    user = req.user
    if (req.user) {
        console.log("userid: ", user.id)
        searchUser(user, res)
    }

    else {
        console.log("skipped load")
        res.render('home', { user: req.user })
    }


}
);

router.get("/addedItem", (req, res) => {

    res.redirect("/")
})

router.get('/register', (req, res) => res.render('home', { user: req.user }));

function searchUser(user, res) {
    //var currentMonth = new Date().getMonth() + 1;
    db.Allowance.findOne({
        where: {
            month_name:currentMonth,
            UserId: user.id
        },
        raw: true,
    }).then((data) => {
        console.log("allowance", data)
        allowance = data
        searchAllData(user, res)

    })
}

function searchAllData(user, res) {
    var currentMonth = new Date().getMonth() + 1;
    console.log("current",currentMonth);
    console.log(user.id)
    db.Category.findAll({
        where: {
            $and: {
                AllowanceId: currentMonth,
                UserId: user.id
            }
        },
        raw: true,
        include: [db.Entries]
    }).then((data) => {
        console.log("enteries", data)
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
                    "category_amount":e.category_amount,
                    "entry_id": e["Entries.id"],
                    "entry_name": entryUpperCase,
                    "amount": e["Entries.amount"],
                    "memo": e["Entries.memo"],
                    "amountType": e["Entries.amountType"]
                })
            }
            else { console.log("null values") }
        })
        console.log("From Server : ", allData)
        searchEnteries(user, res)

    }
    )
}



function searchEnteries(user, res) {
    db.Category.findAll({
        where: {
            $and: {
                AllowanceId: currentMonth,
                UserId: user.id
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
                "category_amount":e.category_amount
            })
        })
        console.log("From Server Category:  ", category)

        res.render('home', {
            user: user,
            alldata: allData,
            category: category,
            allowance: allowance,
            currentMonth: currentMonth
        })

    }
    )
}

module.exports = router;