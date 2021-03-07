const express = require("express");
const expressRouter = express.Router();
const mongoJob = require("../models/job");
const config = require("../config.json");

expressRouter.use((request, response, next) => {
  if(!request.decodedToken){
    return response.status(config.response.unauthorized).send({error: "Missing token"}).end()
  }
  next()
})

// Get all jobs
expressRouter.get("/", async (request, response) => {
  let query = {}

  if(request.decodedToken.permissions.read_jobs === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(request.decodedToken.permissions.read_jobs === 1 && request.decodedToken.permissions.administrator === 0){
    query = {owner: request.decodedToken.id}
  }

  const jobs = await mongoJob.find(query)
    .populate("jenkins")
    .populate("owner")
    .catch(() => response.status(config.response.notfound).send({error: "Jobs not found"}).end())
  return response.status(config.response.ok).send(jobs).end()
})

// Create new job
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.name === undefined){
    return response.status(config.response.badrequest).send({error: "Job text is missing."}).end()
  }

  if(body.jenkins === undefined){
    return response.status(config.response.badrequest).send({error: "Job jenkins url missing"}).end()
  }

  if(body.owner === undefined){
    return response.status(config.response.badrequest).send({error: "Job owner missing."}).end()
  }

  if(body.path === undefined){
    return response.status(config.response.badrequest).send({error: "Job path missing."}).end()
  }



  const newJobData = {
    name: body.name,
    owner: body.owner,
    order: body.order,
    grow: body.grow,
    jenkins: body.jenkins,
    path: body.path
  }

  const newJob = new mongoJob(newJobData)
  await newJob.save();

  return response.status(config.response.ok).send().end()
})

expressRouter.put("/:id", async (request, response) => {
  let job = await mongoJob.findById(body.id)

  if(request.decodedToken.permissions.write_jobs === 1 && job.owner.toString() !== request.decodedToken.id.toString() && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(request.decodedToken.permissions.write_jobs === 0 && request.decodedToken.permissions.administrator === 0){
    return response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  await job.updateOne(body)
})

module.exports = expressRouter;