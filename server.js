console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv')
    .config();
}
import express from 'express';
import routes from './router';
const app = express();

app.use(express.static('public'));

app.use('/', routes);

app.listen(3000, () => {
  console.log("Express started on port 3000...");
});
