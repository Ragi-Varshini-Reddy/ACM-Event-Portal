const express = require('express');
const checkRoleApp = express.Router();
const UserAuthor = require('../models/userAuthorModel');
const expressAsyncHandler = require('express-async-handler');

checkRoleApp.post("/get-role", expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await UserAuthor.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "not found" });
  }

  return res.status(200).send({
    message: user.role,
    payload: user,
  });
}));

module.exports = checkRoleApp;
