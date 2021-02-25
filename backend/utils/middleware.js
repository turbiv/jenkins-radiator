const config = require("../config.json");
const jwt = require("jsonwebtoken");

const errorHandler =  (error, request, response, next) =>{
  console.log(error);
  response.status(config.response.internal_server_error).send({error}).end()
  next(error)
};

const getToken = (request, response, next) =>{
  const authorization = request.get('authorization');

  if (authorization) {
    request.token = authorization.slice(7)
    request.decodedToken = jwt.decode(request.token, config.jwt_signature);

    if(!request.decodedToken){
      response.status(config.response.unauthorized).send({error: "Invalid token"}).end()
    }

    if(!request.decodedToken.permissions){
      response.status(config.response.unauthorized).send({error: "Invalid token, missing permissons"}).end()
    }

    if(!request.decodedToken.id){
      response.status(config.response.unauthorized).send({error: "Missing user id"}).end()
    }

    if(!request.decodedToken.username){
      response.status(config.response.unauthorized).send({error: "Missing username"}).end()
    }
  }
  next()
};

module.exports = {errorHandler, getToken};