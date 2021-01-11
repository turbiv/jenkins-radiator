const express = require("express");
const expressRouter = express.Router();
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");

// Get all groups
expressRouter.get("/", async (request, response) => {
  const groups = await mongoGroup.find({}).catch(() => response.status(config.response.notfound).send({error: "Groups not found"}).end())
  response.status(config.response.ok).send(groups).end()
})

// Create new group
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