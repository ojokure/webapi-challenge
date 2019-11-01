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


module.exports = actionRouter;
