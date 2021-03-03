const express = require("express");
const expressRouter = express.Router();
const mongoRadiator = require("../models/radiator");
const mongoGroup = require("../models/group");
const mongoose = require("mongoose");
const config = require("../config.json");

expressRouter.get("/radiator", async (request, response) => {
  const radiators = await mongoRadiator.find({public: true})
    .populate({
      path: "groups",
      populate: {
        path: "jobs",
        populate: {
          path: "jenkins"
        }
      }
    })
    .populate({
      path: "owner"
    })
    .populate({
      path: "groups",
      populate: {
        path: "owner"
      }
    })
    .populate({
      path: "groups",
      populate: {
        path: "jobs",
        populate: {
          path: "owner"
        }
      }
    })
    .catch(() => response.status(config.response.notfound).send({error: "Radiators not found"}).end())
  return response.status(config.response.ok).send(radiators).end()
})

expressRouter.get("/radiator/:id", async (request, response) => {
  const radiator = await mongoRadiator.findOne({_id: request.params.id, public: true})
    .populate({
      path: "groups",
      populate: {
        path: "jobs",
        populate: {
          path: "jenkins"
        }
      }
    })
    .populate("owner")
    .catch(() => response.status(config.response.notfound).send({error: "Radiators not found"}).end())

  return response.status(config.response.ok).send(radiator).end()
})

module.exports = expressRouter;