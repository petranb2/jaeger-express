const initTracer = require("./tracing").initTracer;

const jaegerLogger = (req, res, next) => {
  const tracer = initTracer("backend-service");
  const span = tracer.startSpan(req.url);
  span.setTag("hello-to", "logger");
  span.log({
    event: "start",
    value: "This is the start event",
  });
  req.span = span;
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} [FINISHED]`);
    req.span.log({
      event: "end",
      value: "This is the end event",
    });
    req.span.finish();
  });
  next();
};

module.exports = jaegerLogger;
