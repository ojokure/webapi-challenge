const express = require("express");

const Projects = require("./data/helpers/projectModel");

const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

projectRouter.post("/", (req, res) => {
  const post = {
    name: req.body.name,
    description: req.body.description
  };
  Projects.insert(post)
    .then(project => {
      if (!post.name || !post.description) {
        res.status(400).json({
          message: "mandatory fields name and description required"
        });
      } else {
        post.id = project.id;
        res.status(200).json({
          project
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = projectRouter;
