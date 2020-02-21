const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");
const Task = require("../../../models/tasks/task");

Router.post("/tasks", auth, (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  task
    .save()
    .then(() => {
      res.send("Task Registered SuccessFully");
    })
    .catch(e => {
      res.status(400).send(e.message);
    });
});

Router.delete("/tasks/:id", async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("No User Founded");
    }
    return res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
Router.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      if (tasks.length) return res.send(tasks);
      return res.status(404).send("Unable To Find Any Task");
    })
    .catch(e => {
      res.status(404).send(e.message);
    });
});

Router.patch("/tasks/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.send("Please enter a valid object id");
  }
  try {
    const Updates = Object.keys(req.body);
    const validUpdates = ["task", "isCompleted"];
    const isValid = Updates.every(update => validUpdates.includes(update));
    if (!isValid) {
      return res.status(400).send("Not The Valid Update");
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.send("No User Found");
    }
    Updates.forEach(update => (task[update] = req.body[update]));
    const savedTask = await task.save();
    return res.send(savedTask);
  } catch (e) {
    return res.send(e.message);
  }
});

Router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("No Task");
    }
    return res.send(task);
  } catch (e) {
    res.status(501).send("Internal server Error");
  }
});

const main = async () => {
  const task = await (await Task.findOne({ task: "Hello How are You Paras ?" }))
    .populate("owner")
    .execPopulate();
  console.log(task);
};
main();

module.exports = Router;
