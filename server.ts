import express = require("express");
const app: express.Application = express();
require("dotenv").config();
var request = require("request");

var options = {
  method: "GET",
  url: "https://ubiqum.atlassian.net/wiki/rest/api/space/STUDENTS/content",
  headers: {
    Accept: "application/json",
    authorization: `Basic ${new Buffer(
      process.env.USER_EMAIL + ":" + process.env.API_TOKEN
    ).toString("base64")}`
  }
};

request(options, function(error: any, response: any, body: any) {
  if (error) throw new Error(error);
  console.log(
    "Response: " + response.statusCode + " " + response.statusMessage
  );
  console.log(body);
});

app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
