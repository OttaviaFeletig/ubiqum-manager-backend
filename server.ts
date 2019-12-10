import express = require("express");
const app: express.Application = express();

const remapRoute: express.Router = require("./routes/remap");
const programRoute: express.Router = require("./routes/page");
const userRoute: express.Router = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const passportSetup = require("./config/passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const { PORT, MONGO_DB, COOKIE_KEY, COOKIE_SECRET } = process.env;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser(COOKIE_SECRET));
app.use(
  cookieSession({
    key: COOKIE_KEY,
    secret: COOKIE_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/remap", remapRoute);
app.use("/pages", programRoute);
app.use("/user", userRoute);

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
