const jaegerLogger = (req, res, next) => {
  const span = req.tracer.startSpan(req.url);
  span.setTag(req.method, req.path);
  span.log({
    event: "start",
    value: "This is the start event",
  });
  req.span = span;
  res.on("finish", () => {
    req.span.log({
      event: "end",
      value: "This is the end event",
    });
    req.span.finish();
  });
  next();
};

module.exports = jaegerLogger;
