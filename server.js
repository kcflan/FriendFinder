//dependancies
const express = require('express');
const path = require('path');
const body = require('body-parser');

// get html and api routers
// const htmlRouter = require('./app/routing/apiRoutes');
// const apiRouter = require('./app/routing/htmlRoutes');
const htmlRouter = require(path.join(__dirname, 'app/routing/apiRoutes'));
const apiRouter = require(path.join(__dirname, 'app/routing/htmlRoutes'));

//set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

//set up the express app to handle data parsing - read up on
//note has to be before the apiRouter fn call. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// after a lot of shennanigans, load the files that are in the public directory from the /assets path prefix
app.use('/assets', express.static(path.join(__dirname, 'app/public')));

htmlRouter(app);
apiRouter(app);

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});