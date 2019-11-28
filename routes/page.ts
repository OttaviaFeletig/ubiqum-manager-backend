import express = require("express");
const router: express.Router = express.Router();
const Page = require("../models/page");
router.get("/", async (req, res) => {
  const pagesDB = await Page.find({});
  res.status(200).send(pagesDB);
});
module.exports = router;
