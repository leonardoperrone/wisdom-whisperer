// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);
exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite((change) => {
  const dataAfterChange = change.after.val();
  // Only send email for new messages.
  if (change.before.val() || !dataAfterChange.name) {
    return;
  }

  const val = dataAfterChange;

  const mailOptions = {
    to: 'marcellomunariblog@gmail.com',
    subject: 'New message from contact form on the WW website',
    text: `\n\tSender's Name: ${val.name} \n
          Sender's Email: ${val.email} \n
          Content: ${val.message}`
  };

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Mail sent'); //The log will be shown in Firebase.
  });
});
