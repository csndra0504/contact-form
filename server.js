console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv')
    .config();
}
import express from 'express';
import nodemailer from 'nodemailer';
import Email from 'email-templates';

const app = express();

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const email = new Email({
  transport: smtpTransport,
  send: true
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/send', function (req, res) {

  const context = {
    name: req.query.name,
    email: req.query.email,
    message: req.query.message,
    fromName: 'Cassandra Wilcox',
    fromEmail: 'cassandra@cassandrawilcox.me'
  };

  const leadMailOptions = {
    to: req.query.email
  };

  const selfMailOptions = {
    to: 'cassandra@cassandrawilcox.me'
  };

  email.send({
    template: 'lead-confirmation',
    message: leadMailOptions,
    locals: context
  })
       .then(res.end("sent"))
       .catch(res.end("error"));

  email.send({
    template: 'new-contact',
    message: selfMailOptions,
    locals: context
  })
       .then(res.end("sent"))
       .catch(res.end("error"));

});

app.listen(3000, () => {
  console.log("Express started on port 3000...");
});
