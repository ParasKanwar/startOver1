require("./db/mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const taskRouter = require(path.join(
  __dirname,
  "./endPoints/Task/task_endpoints"
));
const userRouter = require(path.join(
  __dirname,
  "./endPoints/user/user_endpoints"
));
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectID;
// app.use((req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  res.append("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.static(path.join(__dirname, "../../app-1/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../app-1/build/index.html"));
});
app.use(express.json());
app.use(taskRouter);
app.use(userRouter);

app.listen(port, (err, res) => {
  console.log("Hello World");
});
