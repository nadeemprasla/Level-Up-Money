require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const customAuthMiddleware = require('./middleware/custom-auth-middleware');

// controller imports
const userController = require('./controllers/user-controller');
const viewsController = require('./controllers/views-controller');

// directory references
const clientDir = path.join(__dirname, '../public');

// set up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use the cookie-parser to help with auth token,
// it must come before the customAuthMiddleware
app.use(cookieParser());
app.use(customAuthMiddleware);

// serve up the public folder so we can request static
// assets from our html document
app.use('/assets', express.static(clientDir));

// set up handlebars
app.set('views', path.join(__dirname, '/views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: 'server/views/layouts',
    partialsDir: 'server/views/partials/',
    helpers: {
        formatName: function (alldata, categories, user) {
            console.log("Category current   :", categories)
            html = "";
            alldata.forEach((e) => {
                if (categories.id === e.category_id) {
                    console.log(categories.id, e)
                    html +=
                        `
<div class="row">
    <div class="col-sm-2">
        <span>${e.entry_name}</span>
    </div>
    <div class="col-sm-5">
        <textarea class="form-control" placeholder="Memo">${e.memo}</textarea>
    </div>
    <div class="col-sm-2">
        <select class="form-control form-control-sm" id="choice1" value=${e.amountType}>
            <option value="">Credit</option>
            <option value="1">Debit</option>
        </select>
    </div>
    <div class="col-sm-2">
        <div>${e.amount}</div>
    </div>
</div>
<hr>
                    `
                }

            })
            return html

        }
    }
}));
app.set('view engine', 'handlebars');


// hook up our controllers
app.use(userController);
app.use(viewsController);
require("./controllers/post-api-routes.js")(app);
require("./controllers/get-api-routes.js")(app);



// Requiring our models for syncing
const db = require('./models/index');
var syncOptions = { force: true }
// sync our sequelize models and then start server
db.sequelize.sync().then(() => {
    // inside our db sync callback, we start the server.
    // this is our way of making sure the server is not listening
    // to requests if we have not yet made a db connection
    app.listen(PORT, () => {
        console.log(`App listening on PORT ${PORT} `);
    });
});



