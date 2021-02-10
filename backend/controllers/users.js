const express = require("express");
const expressRouter = express.Router();
const mongoUsers = require("../models/users");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.get('/', async (request, response) =>{
  const users = await mongoUsers.find({});

  response.json(users.map(user => user))
});

expressRouter.get('/:id', async (request, response) =>{
  const user = await mongoUsers.findById(request.params.id);
  response.status(config.response.ok).send(user).end()
});

expressRouter.delete('/:id', async (request, response) =>{
  const deletedUser = await mongoUsers.findByIdAndDelete(request.params.id);
  if(!deletedUser){
    response.status(config.response.no_content).end()
  }
  response.status(config.response.ok).end()
});


module.exports = expressRouter;