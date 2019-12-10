import express = require("express");
import { UserSchemaData } from "../models/user";
import { Request } from "express-serve-static-core";
const router: express.Router = express.Router();
const User = require("../models/user");
const passport = require("passport");
require("dotenv").config();
const authCheck = (
  req: express.Request,
  res: express.Response,
  next: Function
) => {
  if (req.user) {
    next();
  } else {
    res.send("not logged in");
  }
};
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ]
  })
);
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("loggedin" + req.user);
});

router.get("/logout", authCheck, (req, res) => {
  req.logout();
  res.send("logged out");
});

router.get("/", authCheck, (req, res) => {
  res.send(req.user);
});
module.exports = router;
