const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
// initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extenstion = path.extname(req.url);

  let contentType;
});

server.listen(PORT, () => {
  console.log(`server running on port ${PORT} yay`);
});
// // add listener for the log event
// myEmitter.on("log", (msg) => logEvents(msg));

// //Emit event
// myEmitter.emit("log", "Log event emitted!");
