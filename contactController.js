const nodemailer = require('nodemailer');
const Email = require('email-templates');

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

exports.getContactpage = (req, res) => {
  res.sendfile('index.html');
};

exports.sendEmails = (req, res) => {

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

  const confirmationPromise = email.send({
    template: 'lead-confirmation',
    message: leadMailOptions,
    locals: context
  });

  const newContactPromise = email.send({
    template: 'new-contact',
    message: selfMailOptions,
    locals: context
  });

  Promise.all([confirmationPromise, newContactPromise])
         .then(
           function (values) {
             console.log('sent', values);
           })
         .catch(function (err) {
             console.log(err);
           });

};

