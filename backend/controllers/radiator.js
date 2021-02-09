const express = require("express");
const expressRouter = express.Router();
const mongoRadiator = require("../models/radiator");
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");
const jwt = require("jsonwebtoken");

// Get all radiators
expressRouter.get("/", async (request, response) => {
  const radiators = await mongoRadiator.find({})
    .populate({
      path: "groups",
      populate: {
        path: "jobs"
      }
    })
    .catch(() => response.status(config.response.notfound).send({error: "Radiators not found"}).end())
  response.status(config.response.ok).send(radiators).end()
})

expressRouter.get("/:id", async (request, response) => {
  const radiators = await mongoRadiator.findById(request.params.id)
    .populate({
      path: "groups",
      populate: {
        path: "jobs"
      }
    })
    .catch(() => response.status(config.response.notfound).send({error: "Radiators not found"}).end())
  response.status(config.response.ok).send(radiators).end()
})

// Create new radiator
expressRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.decode(request.token, "test");

  if(!decodedToken.username){
    return response.status(config.response.badrequest).send({error: "missing or invalid token"})
  }

  /*if(body.owner === undefined){
    response.status(config.response.badrequest).send({error: "Radiator owner is missing."})
  }*/

  if(!body.name){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."})
  }

  const newRadiatorData = {
   // owner: body.owner,
    name: body.name,
    groups: body.groups
  }

  const newRadiator = new mongoRadiator(newRadiatorData)
  await newRadiator.save();

  response.status(config.response.ok).send().end()
})

expressRouter.put("/", async (request, response) => {
  const body = request.body

  if(!body.name){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."})
  }

  const groupsId = body.groups.map(group => group.id)
  const formattedRadiatorGroups = {...body, groups: groupsId}
  await mongoRadiator.findByIdAndUpdate(body.id, formattedRadiatorGroups)

  const fromattedGroupsJobs = body.groups.map(group => {return {id: group.id, jobs: group.jobs.map(jobRow => jobRow.map(job => job.id))}})

  for(const formattedGroup of fromattedGroupsJobs){
    await mongoGroup.findByIdAndUpdate(formattedGroup.id, formattedGroup)
  }

  response.status(config.response.ok).send().end()
})

expressRouter.put("/settings", async (request, response) => {
  const body = request.body

  if(!body.name){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."})
  }

  await mongoRadiator.findByIdAndUpdate(body.id, body)

  response.status(config.response.ok).send().end()
})


module.exports = expressRouter;