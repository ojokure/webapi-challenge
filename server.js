const express = require("express");

// const actionRouter = require("./actionRouter");

const projectRouter = require("./projectRouter");

const helmet = require("helmet");

const server = express()

server.use(helmet());
server.use(express.json());
// server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);
server.get("/", (req, res) => {
  res.send(`<h2> Let's get it ! </h2>`);
});


module.exports = server;
