const express = require("express");
const expressRouter = express.Router();
const mongoUsers = require("../models/users");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.get("/", async (request, response) =>{
  const users = await mongoUsers.find({});

  return response.json(users.map(user => user))
});

expressRouter.get("/:id", async (request, response) =>{
  const user = await mongoUsers.findById(request.params.id);
  return response.status(config.response.ok).send(user).end()
});

expressRouter.put("/", async (request, response) =>{
  const body = request.body
  await mongoUsers.findByIdAndUpdate(body.id, body)
  return response.status(config.response.ok).send().end()
})

expressRouter.delete("/:id", async (request, response) =>{
  const deletedUser = await mongoUsers.findByIdAndDelete(request.params.id);
  if(!deletedUser){
    return response.status(config.response.no_content).end()
  }
  return response.status(config.response.ok).end()
});


module.exports = expressRouter;