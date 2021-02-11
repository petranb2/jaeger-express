var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const jaegerLogger = require("./middlewares/logger");
var app = express();

app.use(logger("dev"));
app.use(jaegerLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl} [STARTED]`);
//   req.on("end", () => {
//     console.log(`${req.method} ${req.originalUrl} [end]`);
//   });
//   res.on("finish", () => {
//     console.log(`${req.method} ${req.originalUrl} [FINISHED]`);
//     req.span.log({
//       event: "end",
//       value: "This is the end event",
//     });
//     req.span.finish();
//   });

//   res.on("close", () => {
//     console.log(`${req.method} ${req.originalUrl} [CLOSED]`);
//     req.span.log({
//       event: "end",
//       value: "This is the end event",
//     });
//     req.span.finish();
//   });

//   next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);

// app.use(function (err, req, res, next) {
//   // logic
//   console.log("end of the event");
//   req.span.log({
//     event: "end",
//     value: "This is the end event",
//   });
//   req.span.finish();
//   next();
// });
module.exports = app;
