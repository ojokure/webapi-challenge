const express = require("express");

const Actions = require("./data/helpers/actionModel");

const actionRouter = express.Router();

actionRouter.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(() => {
      res.status(500).json({
        error: "this content could not be retrieved"
      });
    });
});

actionRouter.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      if (!action) {
        res.status(400).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(200).json({
          action
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "this content could not be retrieved"
      });
    });
});

actionRouter.post("/", (req, res) => {
  const post = {
    description: req.body.description,
    note: req.body.note
  };
  actions
    .insert(post)
    .then(action => {
      if (!post.description || !post.note) {
        res.status(400).json({
          message: "mandatory fields note and description required"
        });
      } else {
        post.id = action.id;
        res.status(200).json({
          action
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "This action could not be posted"
      });
    });
});

module.exports = actionRouter;
