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
        path: "jobs",
        populate: {
          path: "jenkins"
        }
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
        path: "jobs",
        populate: {
          path: "jenkins"
        }
      }
    })
    .catch(() => response.status(config.response.notfound).send({error: "Radiators not found"}).end())
  response.status(config.response.ok).send(radiators).end()
})

// Create new radiator
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  if(decodedToken.permissions.write_radiators === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
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
    groups: body.groups,
    owner: body.owner
  }

  const newRadiator = new mongoRadiator(newRadiatorData)
  await newRadiator.save();

  response.status(config.response.ok).send().end()
})

expressRouter.put("/", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let radiator = await mongoRadiator.findById(body.id)

  if(decodedToken.permissions.write_radiators === 1 && radiator.owner !== decodedToken.id){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(decodedToken.permissions.write_radiators === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(!body.name){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."}).end()
  }

  const groupsId = body.groups.map(group => group.id)
  const formattedRadiatorGroups = {...body, groups: groupsId}

  radiator = formattedRadiatorGroups
  await radiator.save()

  if(decodedToken.permissions.write_groups === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  const fromattedGroupsJobs = body.groups.map(group => {return {id: group.id, jobs: group.jobs.map(jobRow => jobRow.map(job => job.id))}})

  for(const formattedGroup of fromattedGroupsJobs){

    let group = await mongoGroup.findById(formattedGroup.id)

    if(decodedToken.permissions.write_groups === 1 && group.owner !== decodedToken.id){
      response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
    }

    group = formattedGroup
    await group.save()
  }

  response.status(config.response.ok).send().end()
})

expressRouter.put("/settings", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let radiator = await mongoRadiator.findById(body.id)

  if(decodedToken.permissions.write_radiators === 1 && radiator.owner !== decodedToken.id){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(decodedToken.permissions.write_radiators === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(!body.name){
    response.status(config.response.badrequest).send({error: "Radiator name is missing."})
  }

  radiator = body
  await radiator.save()

  response.status(config.response.ok).send().end()
})


module.exports = expressRouter;