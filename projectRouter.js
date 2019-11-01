const express = require("express");

const Projects = require("./data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      message: error.message;
    });
});

module.exports = router;
