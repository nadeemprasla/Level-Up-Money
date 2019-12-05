const express = require('express');
const router = express.Router();

const db = require('../models')
let category;
router.get('/', (req, res) => {
    try {
        console.log(typeof req.user.id)
        db.Category.findAll({
            where: {
                UserId: req.user.id
            },
            raw: true
        }).then((data) => {
            category = [];
            data.map((e) => {
                upperit = e.category_name.toLowerCase()
                upperit = upperit.charAt(0).toUpperCase() + upperit.slice(1)
                category.push({
                    "id":e.id,
                    "category_name": upperit
                })    
            })
            console.log("from server", category)

            res.render('home', {
                user: req.user,
                category: category
            }
            )
        })
    } catch (err) {
        console.log("error with user.id", err)
    }
}
);

router.get('/register', (req, res) => res.render('home', { user: req.user }));

// router.get('/dashboard', (req, res) => res.render('dashboard', {}));


module.exports = router;