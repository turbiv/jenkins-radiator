const express = require("express");
const expressRouter = express.Router();
const mongoJob = require("../models/job");
const mongoose = require("mongoose");
const config = require("../config.json");

// Get all jobs
expressRouter.get("/", async (request, response) => {
  const jobs = await mongoJob.find({})
    .populate("jenkins")
    .catch(() => response.status(config.response.notfound).send({error: "Jobs not found"}).end())
  console.log(jobs)
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


  const newJobData = {
    name: body.name,
    owner: body.owner,
    order: body.order,
    grow: body.grow,
    jenkins: body.jenkins
  }

  const newJob = new mongoJob(newJobData)
  await newJob.save();

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;