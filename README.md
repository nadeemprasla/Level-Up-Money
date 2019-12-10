## Level Up Money

### Overview
​
* The bugdet planner application gives you functionality where you can plan your monthly budget by login/signup the application.
​
* You can perform following operations
​
1. Add budget and other income for any month
2. Add category/ies for month/s
3. Add items (purchased) inside category
4. Add amount for every category
5. Edit the amount fields as per the need
6. Use the chart functionality to see the expediture for the month
* on page reload, it gives you most recent changes in every feild.
​
​
### Import
`npm i express`
`npm i express-handlebars`
`npm i body-parser`
`npm i bcrypt`
`npm i path`
`npm i cookie-parser`
`npm i sequalize`
`npm i mysql2`
​
​
### Database schema setup
​
`CREATE DATABASE <db_name>`
`USE <db_name>`
​
## Sequalize Model 
1.User
2.Authtoken
3.Category
4.Entries
5.Allowance
​
​
### Running the app
 `npm start`
​
​
### Using a Local Database
you need add $PASSWORD in your .env file.
and change the config.js to set the environment properties and add environment type in index.js 
​
### Using the server database mapping
Create a config variable to server settings for DB mapping.
​
​
### Deployment
update the git repo at master branch then
`heroku login`
`git remote -v`
`heroku create`
`git remote -v`
`git push heroku master` 
The client files in app/ will be built along with each deployment.
Collapse


### Credits:
 BoilerPlate for User/Auth from: jgrisafe 
 github: https://github.com/jgrisafe/express-sequelize-authentication-boilerplate
 
 Shweta and Nadeem
