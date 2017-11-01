console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // Loads environment settings from '.env' into process.env
  // This is for local development
  require('dotenv').config();
}
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.static('public'));

app.get('/', (req,res) => {
  res.sendfile('index.html');
});

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.get('/send',function(req,res){

  const leadMailOptions = {
    to: req.query.email,
    subject: "Thanks for reaching out!",
    text: `Hey there ${req.query.name}!
    
    Thank you so much for emailing me. I will be in touch with your shortly. 
    
    For your records, a copy of the message I received from you is below:
    
    -----
    
    Your name: 
    ${req.query.name}
    
    Your email: 
    ${req.query.email}
    
    Your Message:
    ${req.query.message}
    
    -----
    
    Kind regards,
    
    Cassandra Wilcox
    cassandra@cassandrawilcox.me
    `
  };

  const selfMailOptions = {
    to: "cassie@codehangar.io",
    subject: "New contact form submission from " + req.query.name,
    text: `You have a new email from ${req.query.name}!
    
    Their email is ${req.query.email}.
    
    Here's what they have to say:
    ${req.query.message}
    `
  };

  // console.log(leadMailOptions);
  // console.log(selfMailOptions);
  smtpTransport.sendMail(leadMailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
  smtpTransport.sendMail(selfMailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

app.listen(3000, () => {
  console.log("Express started on port 3000...");
})
