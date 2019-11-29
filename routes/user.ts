import express = require("express");
import { UserSchemaData } from "../models/user";
const router: express.Router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
router.post("/sign-up", async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      role
    }: {
      name: string;
      surname: string;
      email: string;
      password: string;
      role: string;
    } = req.body;
    const user = await User.findOne({ email });
    if (user) res.status(409).send("Conflict: Email Already In DB");
    const hashedPassword = await hashPassword(password);
    const newUser: UserSchemaData = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role: role || "User"
    });
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
