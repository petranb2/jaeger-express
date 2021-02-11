var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.span.log({
    event: "log from route",
    value: "log from route",
  });
  res.send("respond with a resource");
});

module.exports = router;
