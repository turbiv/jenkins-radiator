const express = require("express");
const expressRouter = express.Router();
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");
const jwt = require("jsonwebtoken");

expressRouter.use((request, response, next) => {
  if(!request.decodedToken){
    response.status(config.response.unauthorized).send({error: "Missing token"}).end()
  }
  next()
})

// Get all groups
expressRouter.get("/", async (request, response) => {
  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let query = {}

  if(decodedToken.permissions.read_groups === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }


  if(decodedToken.permissions.read_groups === 1 && decodedToken.permissions.administrator === 0){
    query = {owner: decodedToken.id}
  }
  const groups = await mongoGroup.find(query)
    .populate({
      path: "jobs",
      populate: {
        path: "jenkins"
      }
    })
    .populate({
      path: "owner",
    })
    .populate({
      path: "jobs",
      populate: {
        path: "owner"
      }
    })
    .catch(() => response.status(config.response.notfound).send({error: "Groups not found"}).end())
  response.status(config.response.ok).send(groups).end()
})

expressRouter.get("/:id", async (request, response) => {
  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  if(decodedToken.permissions.read_groups === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  const group = await mongoGroup.findById(request.params.id)
    .catch(() => response.status(config.response.notfound).send({error: "Groups not found"}).end())

  if(decodedToken.permissions.read_groups === 1 && group.owner !== decodedToken.id && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }


  await group.populate({
      path: "jobs",
      populate: {
        path: "jenkins"
      }
    })
    .populate("owner")
    .execPopulate()
  response.status(config.response.ok).send(groups).end()
})

// Create new group
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  if(decodedToken.permissions.write_groups === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(body.title === undefined){
    response.status(config.response.badrequest).send({error: "Group title missing."})
  }

  if(body.owner === undefined){
    response.status(config.response.badrequest).send({error: "Group owner missing."})
  }

  const newGroupData = {
    title: body.title,
    jobs: body.jobs,
    owner: body.owner
  }

  const newGroup = new mongoGroup(newGroupData)
  await newGroup.save();

  response.status(config.response.ok).send().end()
})

expressRouter.put("/", async (request, response) => {
  const body = request.body

  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let group = await mongoGroup.findById(body.id)

  if(decodedToken.permissions.write_groups === 1 && group.owner !== decodedToken.id && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(decodedToken.permissions.write_groups === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(body.title === undefined){
    response.status(config.response.badrequest).send({error: "Group title missing."})
  }

  if(body.owner === undefined){
    response.status(config.response.badrequest).send({error: "Group owner missing."})
  }

  group = body
  await group.save()

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;