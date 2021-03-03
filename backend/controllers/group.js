const express = require("express");
const expressRouter = express.Router();
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");
const jwt = require("jsonwebtoken");

expressRouter.use((request, response, next) => {
  if(!request.decodedToken){
    return response.status(config.response.unauthorized).send({error: "Missing token"}).end()
  }
  next()
})

// Get all groups
expressRouter.get("/", async (request, response) => {
  let query = {}

  if(request.decodedToken.permissions.read_groups === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }


  if(request.decodedToken.permissions.read_groups === 1 && request.decodedToken.permissions.administrator === 0){
    query = {owner: request.decodedToken.id}
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
  return response.status(config.response.ok).send(groups).end()
})

expressRouter.get("/:id", async (request, response) => {

  if(request.decodedToken.permissions.read_groups === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  const group = await mongoGroup.findById(request.params.id)
    .catch(() => response.status(config.response.notfound).send({error: "Groups not found"}).end())

  if(request.decodedToken.permissions.read_groups === 1 && group.owner.toString() !== request.decodedToken.id.toString() && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }


  await group.populate({
      path: "jobs",
      populate: {
        path: "jenkins"
      }
    })
    .populate("owner")
    .execPopulate()
  return response.status(config.response.ok).send(group).end()
})

// Create new group
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(request.decodedToken.permissions.write_groups === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(body.title === undefined){
    return response.status(config.response.badrequest).send({error: "Group title missing."})
  }

  if(body.owner === undefined){
    return response.status(config.response.badrequest).send({error: "Group owner missing."})
  }

  const newGroupData = {
    title: body.title,
    jobs: body.jobs,
    owner: body.owner
  }

  const newGroup = new mongoGroup(newGroupData)
  await newGroup.save();

  return response.status(config.response.ok).send().end()
})

expressRouter.put("/", async (request, response) => {
  const body = request.body

  let group = await mongoGroup.findById(body.id)

  if(request.decodedToken.permissions.write_groups === 1 && group.owner.toString() !== request.decodedToken.id.toString() && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(request.decodedToken.permissions.write_groups === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(body.title === undefined){
    return response.status(config.response.badrequest).send({error: "Group title missing."})
  }

  if(body.owner === undefined){
    return response.status(config.response.badrequest).send({error: "Group owner missing."})
  }

  group = body
  await group.save()

  return response.status(config.response.ok).send().end()
})

module.exports = expressRouter;