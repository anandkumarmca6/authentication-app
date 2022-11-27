const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(express.static('./assets'));
app.use(expressLayouts);
// extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// Use express route
app.use('/', require('./routes'));
// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server ${err}`);
  }
  console.log(`Server is running on port ${port}`);
});
