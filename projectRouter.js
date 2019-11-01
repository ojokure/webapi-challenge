const express = require("express");

const Projects = require("./data/helpers/projectModel");

const projectRouter = express.Router();

projectRouter.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({
        error: "this content could not be retrieved"
      });
    });
});

projectRouter.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      if (!project) {
        res.status(400).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          project
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "this content could not be retrieved"
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
    .catch(() => {
      res.status(500).json({
        error: "This project could not be posted"
      });
    });
});
projectRouter.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      errorMessage: "Please provide name and description to edit this project."
    });
  } else {
    Projects.update(req.params.id, req.body)
      .then(updated => {
        if (!updated) {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        } else {
          res.status(200).json({
            updated: req.body
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The project information could not be modified."
        });
      });
  }
});

projectRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res.status(201).end();
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "This project could not be removed"
      });
    });
});

module.exports = projectRouter;
