const express = require("express");
const expressRouter = express.Router();
const mongoJob = require("../models/job");
const mongoose = require("mongoose");
const config = require("../config.json");
const jwt = require("jsonwebtoken")

expressRouter.use((request, response, next) => {
  if(!request.decodedToken){
    response.status(config.response.unauthorized).send({error: "Missing token"}).end()
  }
  next()
})

// Get all jobs
expressRouter.get("/", async (request, response) => {
  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let query = {}

  if(decodedToken.permissions.read_jobs === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  if(decodedToken.permissions.read_jobs === 1 && decodedToken.permissions.administrator === 0){
    query = {owner: decodedToken.id}
  }

  const jobs = await mongoJob.find(query)
    .populate("jenkins")
    .populate("owner")
    .catch(() => response.status(config.response.notfound).send({error: "Jobs not found"}).end())
  response.status(config.response.ok).send(jobs).end()
})

// Create new job
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.name === undefined){
    response.status(config.response.badrequest).send({error: "Job text is missing."}).end()
  }

  if(body.jenkins === undefined){
    response.status(config.response.badrequest).send({error: "Job jenkins url missing"}).end()
  }

  if(body.owner === undefined){
    response.status(config.response.badrequest).send({error: "Job owner missing."}).end()
  }

  if(body.path === undefined){
    response.status(config.response.badrequest).send({error: "Job path missing."}).end()
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

  response.status(config.response.ok).send().end()
})

expressRouter.put("/:id", async (request, response) => {

  const decodedToken = jwt.decode(request.token, config.jwt_signature);

  let job = await mongoJob.findById(body.id)

  if(decodedToken.permissions.write_jobs === 1 && job.owner !== decodedToken.id && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }
  if(decodedToken.permissions.write_jobs === 0 && decodedToken.permissions.administrator === 0){
    response.status(config.response.unauthorized).send({error: "Request doesnt not meet the permission level."}).end()
  }

  job = body
  await job.save()
})

module.exports = expressRouter;