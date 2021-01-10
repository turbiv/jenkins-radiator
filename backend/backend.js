const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const morgan = require('morgan');
const middleware = require("./utils/middleware");
const baseurl = "/v1/";
const mongoUrl = "mongodb+srv://turbiv:ivan123.@cluster01.pzhm6.mongodb.net/raidator?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(middleware.getToken);
//mongoose.set('debug', true);


//TODO: Error handlers
app.use(middleware.errorHandler);


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});