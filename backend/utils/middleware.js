const mongoUsers = require("../models/users");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const errorHandler =  (error, request, response, next) =>{
  console.log(error);
  next(error)
};

const getToken = (request, response, next) =>{
  const authorization = request.get('authorization');
  if (authorization) {
    request.token = authorization.slice(7)
  }
  next()
};


module.exports = {errorHandler, getToken};