var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // console.log('test')
  // req.span.log({
  //   event: "end",
  //   value: "This is the end event",
  // });
  // req.span.finish();
  req.span.log({
    event: "log from route",
    value: "log from route",
  });
  res.send("respond with a resource");
  // next();
});

module.exports = router;
