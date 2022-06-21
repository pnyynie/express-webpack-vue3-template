"use strict";

process.env.NODE_ENV = "development";

process.on("unhandledRejection", (err) => {
	throw err;
});

const chalk = require("chalk");
const http = require("http");
const config = require("config");

const port = parseInt(config.get("port"), 10);
const app = require("../server/app");
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  chalk && console.log(chalk.bgWhite.black(`\n Listening on ${bind} \n`));
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}