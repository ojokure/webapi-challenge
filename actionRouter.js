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

actionRouter.put("/:id", (req, res) => {
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({
      errorMessage: "Please provide note and description to edit this action."
    });
  } else {
    Actions.update(req.params.id, req.body)
      .then(updated => {
        if (!updated) {
          res.status(404).json({
            message: "The action with the specified ID does not exist."
          });
        } else {
          res.status(200).json({
            updated: req.body
          });
        }
      })
      .catch(() => {
        res.status(500).json({
          error: "The action information could not be modified."
        });
      });
  }
});

actionRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(201).end();
      }
    })
    .catch(() => {
      res.status(500).json({
        error: "This action could not be removed"
      });
    });
});

module.exports = actionRouter;
