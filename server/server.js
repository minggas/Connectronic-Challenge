const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const apiRoutes = require("./routes/api");
const cors = require("cors");

const app = express();

//Helmet Security Measures
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(helmet());
app.use(cors(corsOptions));

app.use("/public", express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/").get(function(req, res) {
  res.send("sdfdfskfdhmlaskhvl");
});

//Routing for API
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type("text")
    .send("Not Found");
});

//Start our server and tests!
app.listen(process.env.PORT || 8080, function() {
  console.log("Listening on port " + process.env.PORT);
});

module.exports = app; //for testing
