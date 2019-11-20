import express = require("express");
const router: express.Router = express.Router();
require("dotenv").config();
var request = require("request");
var rp = require("request-promise");

var options = {
  method: "GET",
  url:
    "https://ubiqum.atlassian.net/wiki/rest/api/space/STUDENTS/content?depth=root&expand=children.page",
  headers: {
    Accept: "application/json",
    authorization: `Basic ${new Buffer(
      process.env.USER_EMAIL + ":" + process.env.API_TOKEN
    ).toString("base64")}`
  }
};

router.get("/", async (req, res) => {
  try {
    const response = await rp(options);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
