const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan');
const middleware = require("./utils/middleware");

const groupController = require("./controllers/group")
const jobController = require("./controllers/job")
const radiatorController = require("./controllers/radiator")
const authenticationController = require("./controllers/authentication")
const usersController = require("./controllers/users")
const jenkinsController = require("./controllers/jenkins")

const mongoUrl = "mongodb+srv://turbiv:test123.@cluster01.pzhm6.mongodb.net/radiator?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(middleware.getToken);
//mongoose.set('debug', true);

app.use("/api/radiator/group", groupController)
app.use("/api/radiator/job", jobController)
app.use("/api/radiator", radiatorController)
app.use("/api/auth", authenticationController)
app.use("/api/users", usersController)
app.use("/api/jenkins", jenkinsController)

//TODO: Error handlers
app.use(middleware.errorHandler);


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});