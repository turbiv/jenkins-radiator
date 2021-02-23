const express = require("express");
const expressRouter = express.Router();
const mongoJenkins = require("../models/jenkins");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.get("/", async (request, response) => {
  const jenkins = await mongoJenkins.find({})
    .catch(() => response.status(config.response.notfound).send({error: "Jenkins not found"}).end())
  response.status(config.response.ok).send(jenkins).end()
})

expressRouter.get("/:id", async (request, response) => {
  const jenkins = await mongoJenkins.findById(request.params.id)
    .catch(() => response.status(config.response.notfound).send({error: "Jenkins not found"}).end())
  response.status(config.response.ok).send(jenkins).end()
})

expressRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.name === undefined){
    response.status(config.response.badrequest).send({error: "Jenkins name missing."})
  }

  if(body.url === undefined){
    response.status(config.response.badrequest).send({error: "Jenkins url missing."})
  }

  const newJenkinsData = {
    url: body.url,
    name: body.name,
    token: body.token
  }

  const newJenkins = new mongoJenkins(newJenkinsData)
  await newJenkins.save();

  response.status(config.response.ok).send().end()
})

module.exports = expressRouter;