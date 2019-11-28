import express = require("express");
const app: express.Application = express();
const remapRoute: express.Router = require("./routes/remap");
const programRoute: express.Router = require("./routes/page");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { PORT, MONGO_DB } = process.env;
console.log(
  new Buffer(process.env.USER_EMAIL + ":" + process.env.API_TOKEN).toString(
    "base64"
  )
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());
const connect = async () => {
  try {
    const res = await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
app.use("/remap", remapRoute);
app.use("/pages", programRoute);
const listen = async () => {
  var connection = await connect();
  if (connection !== undefined) {
    console.log("connected");
    app.listen(PORT, function() {
      console.log("App listening on port 5000!");
    });
  }
};
listen();
