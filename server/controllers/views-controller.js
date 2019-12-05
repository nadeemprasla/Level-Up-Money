const express = require('express');
const router = express.Router();

const db = require('../models')
let category;
let enteries;
let user;

router.get('/', (req, res) => {
    user = req.user
    if (req.user) {
        console.log("userid: ", user.id)
        searchCategory(user, res)
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



function searchCategory(user, res) {
    db.Category.findAll({
        where: {
            UserId: user.id
        },
        raw: true
    }).then((data) => {
        category = [];
        data.map((e) => {
            upperit = e.category_name.toLowerCase()
            upperit = upperit.charAt(0).toUpperCase() + upperit.slice(1)
            category.push({
                "id": e.id,
                "category_name": upperit
            })
        })
        console.log("From Server Categories: ", category)

        searchEnteries(user, res)
    }
    )
}



function searchEnteries(user, res) {
    db.Entries.findAll({
        where: {
            UserId: user.id
        },
        raw: true
    }).then((data) => {
        enteries = [];
        data.map((e) => {
            upperit = e.entry_name.toLowerCase()
            upperit = upperit.charAt(0).toUpperCase() + upperit.slice(1)
            enteries.push({
                "id": e.id,
                "entry_name": upperit,
                "amount": e.amount,
                "amountType": e.amountType
            })
        })
        console.log("From Server Enteries:  ", enteries)
       
        console.log("Before Render: ", enteries)
        res.render('home', {
            user: user,
            category: category,
            enteries: enteries
        })

    }
    )
}

module.exports = router;