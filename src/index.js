require("./db/mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const taskRouter = require(path.join(
  __dirname,
  "./endPoints/Task/task_endpoints"
));
const userRouter = require(path.join(
  __dirname,
  "./endPoints/User/user_endpoints"
));
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectID;
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, (err, res) => {
  console.log("Hello World");
});
