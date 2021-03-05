const express = require("express");
const expressRouter = express.Router();
const config = require("../config.json");
const http = require('http');


expressRouter.get("/", async (request, response) => {

  const jenkinsHost = request.get("jenkins-host")
  const jenkinsPath = request.get("jenkins-path")
  const jenkinsToken = request.get("jenkins-authorization")
  const jenkinsPort = request.get("jenkins-port")

  const options = {
    host: jenkinsHost,
    path: jenkinsPath,
    port: Number(jenkinsPort),
    method: "GET",
    headers: {
      "Authorization": jenkinsToken
    }
  }

  new Promise((resolve, reject) => {
    const httpreq = http.request(options, (proxyResponse) => {
      var result = ""
      proxyResponse.on("data", chunk => {
        result += chunk
      });

      proxyResponse.on("end", () => {
        resolve(result)
      })

      proxyResponse.on("error", error => {
        reject(error)
      });

      proxyResponse.on("uncaughtException", error => {
        reject(error)
      });
    })
    httpreq.end()
  })
    .then((result) => response.status(config.response.ok).send(JSON.parse(result)).end())
    .catch((error) => response.status(config.response.notfound).send({error: error}).end())
})

module.exports = expressRouter;