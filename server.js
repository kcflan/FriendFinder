//dependancies
const express = require('express');
const path = require('path');
//const body = require('body-parser');

// get html and api routers
const htmlRouter = require('./app/routing/apiRoutes');
const apiRouter = require('./app/routing/htmlRoutes');

//set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

//set up the express app to handle data parsing - read up on
//note has to be before the apiRouter fn call. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

htmlRouter(app);
apiRouter(app);

app.listen(PORT, () => {
    console.log("App listening on PORT: " + PORT);
});