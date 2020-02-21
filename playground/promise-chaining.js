require("../src/db/mongoose");
const Task = require("../models/tasks/task");

// Task.findOneAndUpdate({ isCompleted: true })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// Task.findByIdAndUpdate("5e29e10eacd10b119cb3c009", { isCompleted: true })
//   .then(res => {
//     console.log(res);
//     return Task.countDocuments();
//   })
//   .then(count => {
//     console.log(count);
//   })
//   .catch(e => {
//     console.log(e);
//   });

Task.findByIdAndDelete("5e29e10eacd10b119cb3c009")
  .then(res => Task.countDocuments())
  .then(count => console.log(count))
  .catch(e => console.log(e));
