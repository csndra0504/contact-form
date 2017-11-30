console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv')
    .config();
}
const express = require('express');
const routes = require('./router');
const app = express();

app.use(express.static('public'));

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Express started on port 3000...");
});
