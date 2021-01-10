const express = require("express");
const expressRouter = express.Router();
const mongoRadiator = require("../models/radiator");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.owner === undefined){
    response.status(config.response.badrequest).send({error: "Radiator owner is missing."})
  }

  if(body.name === undefined){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."})
  }

  const newRadiatorData = {
    owner: body.owner,
    name: body.name,
    groups: body.groups
  }

  const newRadiator = new mongoRadiator(newRadiatorData)
  await newRadiator.save();

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;