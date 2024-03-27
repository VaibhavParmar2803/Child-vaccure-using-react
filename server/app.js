const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const xss = require('xss-clean');


//global variable
global.globalRootPath = __dirname;

//Configuration app use
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.json());

app.use(xss());

var models = require('./app/models');

models.sequelize.sync().then(function () {
    
      console.log('Nice! Database looks fine')
}).catch(function (err) {
  
      console.log(err, "Something went wrong with the Database Update!")
  
});

const apiRoute = require('./app/routes/api/api_routes')();
app.use('/',apiRoute);

const port = process.env.PORT || 5555;

app.listen(port,() =>{
    console.log('Server start in ' + port);
});