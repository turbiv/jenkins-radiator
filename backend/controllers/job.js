const express = require("express");
const expressRouter = express.Router();
const mongoJob = require("../models/job");
const mongoose = require("mongoose");
const config = require("../config.json");

// Get all jobs
expressRouter.get("/", async (request, response) => {
  const jobs = await mongoJob.find({}).catch(() => response.status(config.response.notfound).send({error: "Jobs not found"}).end())
  response.status(config.response.ok).send(jobs).end()
})

// Create new job
expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.text === undefined){
    response.status(config.response.badrequest).send({error: "Job text is missing."})
  }

  const newJobData = {
    text: body.text,
    order: body.order,
    grow: body.grow
  }

  const newJob = new mongoJob(newJobData)
  await newJob.save();

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;