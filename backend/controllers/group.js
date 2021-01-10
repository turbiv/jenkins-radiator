const express = require("express");
const expressRouter = express.Router();
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.get("/", async (request, response) => {


  response.status(config.response.ok).send({test: "all ok"}).end()
})

expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.title === undefined){
    response.status(config.response.badrequest).send({error: "Group title missing."})
  }

  const newGroupData = {
    title: body.title,
    jobs: body.jobs
  }

  const newGroup = new mongoGroup(newGroupData)
  await newGroup.save();

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;