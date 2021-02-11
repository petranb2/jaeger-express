var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const initTracer = require("./middlewares/tracing").initTracer;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const jaegerLogger = require("./middlewares/logger");
var app = express();
const tracer = initTracer("backend-service");
app.use(function (req, res, next) {
    req.tracer = tracer;
    next()
})
app.use(logger("dev"));
app.use(jaegerLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
module.exports = app;
