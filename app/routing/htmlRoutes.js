// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require('path');

let htmlRoutes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });

  // If no matching route is found default to home for now, TODO 404
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });
};

module.exports = htmlRoutes;
