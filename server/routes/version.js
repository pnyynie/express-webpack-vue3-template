var express = require("express");
var router = express.Router();
var fs = require("fs");

const version = function (req, res, next) {
  res.set("Content-Type", "text/html");
  var version = fs.readFileSync("version.txt");
  if (version) {
    res.send(version.toString());
  } else {
    res.send("version.txt does not exist!");
  }
};

router.get("/version", version);

module.exports = router;
