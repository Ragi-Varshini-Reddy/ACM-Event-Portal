// routes/notifyRoutes.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/userAuthorModel'); // adjust based on your setup

router.post('/send-to-all', async (req, res) => {
  try {
    const users = await User.find({role:"user"}, 'email'); // get all emails
    const emails = users.map(user => user.email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '23071A0566@vnrvjiet.in',
        pass: 'flojbvqaoqkytwyx',
      }
    });

    const mailOptions = {
      from: '23071A0566@vnrvjiet.in',
      to: emails,
      subject: 'New Event Created!',
      text: `A new event has been posted: ${req.body.title || 'Check the platform for details!'} This is an automated email, please do not reply.For any queries, contact us at: sanvaya@gmail.com`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Emails sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to send emails' });
  }
});

module.exports = router;
