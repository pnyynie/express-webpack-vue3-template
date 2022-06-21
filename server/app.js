const fs = require("fs");
const path = require("path");
const config = require("config");
const express = require("express");
const useragent = require("express-useragent");
const bodyParser = require("body-parser");

const APP_BUILD_ENV = path.resolve(__dirname, "../client/dist");

const app = express();

app.disable("x-powered-by");
app.use(useragent.express());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let ejs = require("ejs");
ejs.delimiter = "$";
app.set("views", APP_BUILD_ENV);
app.engine(".html", ejs.__express);
app.set("view engine", "ejs");

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.header("Access-Control-Allow-Origin", "*");
  }
  next();
})

require("./routes")(app);
app.use(require("./utils/rewritePage"));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require('../webpack')("development");
  const devMiddleware = require("webpack-dev-middleware");
  const hotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  app.use(
    devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      writeToDisk: (filePath) => true || /\.html$/.test(filePath),
    })
  );
  app.use(hotMiddleware(compiler));
}

app.use((req, res, next) => {
  if (req._rewritePage) {
    let filePath = path.join(APP_BUILD_ENV, req._rewritePage);
    let userInfo = {};
    let pageParams = {
      userInfo,
      env: config.get("env")
    };

    fs.access(filePath, function (err) {
      if (err) next();
      else {
        res.render(filePath, { pageParams: JSON.stringify(pageParams) });
      }
    });
  } else {
    next();
  }
});

app.use(express.static(APP_BUILD_ENV));

app.use(function (req, res, next) {
  res.sendStatus(404);
});

module.exports = app;