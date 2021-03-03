const express = require("express");
const expressRouter = express.Router();
const bcrypt = require('bcryptjs');
const mongoUsers = require("../models/users");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("../config.json");

const jwtSignature =  process.env.JWT_SIGN ? process.env.JWT_SIGN : config.jwt_signature

expressRouter.post('/login', async (request, response) =>{
  const body = request.body;

  const user = await mongoUsers.findOne({username: body.username});

  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

  if(!(passwordCorrect || user)){
    return response.status(401).send({error: "invalid username or password"})
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    permissions: user.permissions
  };

  const token = jwt.sign(userForToken, jwtSignature);
  console.log({token, username: user.username, name: user.name})

  return response.status(200).send({token, username: user.username, name: user.name, permissions: user.permissions, id: user._id})

});

expressRouter.post('/register', async (request, response) =>{
  const body = request.body;

  if(!(body.password || body.username)){
    return response.status(400).send({error: "username or password is missing"})
  }

  if(body.password.length < 3 || body.username < 3){
    return response.status(400).send({error: "username or password must be at least 3 characters long"})
  }

  if(!body.name){
    return response.status(400).send({error: "name is missing"})
  }

  const saltrounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltrounds);

  const user = new mongoUsers({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save();

  const userForToken = {
    username: body.username,
    id: savedUser._id
  };

  const token = jwt.sign(userForToken, jwtSignature);

  return response.json({token, username: savedUser.username, name: savedUser.name, permissions: savedUser.permissions, id: savedUser._id})
});


module.exports = expressRouter;