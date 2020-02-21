const mongoose = require("mongoose");
const validator = require("validator");
const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    isCompleted: { type: Boolean, default: false },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user"
    }
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000
    }
  }
);
TaskSchema.pre("save", function(next) {
  console.log("TaskSchema pre");
  next();
});

const task = mongoose.model("task", TaskSchema);

module.exports = task;
