import express = require("express");
const app: express.Application = express();
const spaceRoute: express.Router = require("./routes/space");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/api/space", spaceRoute);
app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
