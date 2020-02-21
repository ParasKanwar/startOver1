require("../src/db/mongoose.js");
const Task = require("../models/tasks/task");

// Task.findByIdAndUpdate("5e29e10eacd10b119cb3c009", {
//   task: "not to Shit man !"
// })
//   .then(res => {
//     console.log(res);
//     return Task.countDocuments();
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log(e);
//   });

const updateAndCountDocuments = async id => {
  const updatedTask = await Task.findByIdAndUpdate(id, { isCompleted: true });
  const documentsCount = await Task.countDocuments();
  return documentsCount;
};

updateAndCountDocuments("5e32f3dee9c8e1120ca0bfee")
  .then(updatedTask => console.log(`Updated Tasks are ${updatedTask}`))
  .catch(e => {
    console.log(e);
  });
