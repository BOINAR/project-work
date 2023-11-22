require("dotenv").config();
require("./models/connection");
const fileUpload = require("express-fileupload");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var signUpRouter = require("./routes/signUp");
var listOffersRouter = require("./routes/listOffers");
var jobListRouter = require("./routes/skillList");
var userInfoRouter = require("./routes/userInfo");
var app = express();

app.use(fileUpload());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use("/signUp", signUpRouter);
app.use("/offers", listOffersRouter);
app.use("/skills", jobListRouter);
app.use("/userInfo", userInfoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.disable('etag');

module.exports = app;
