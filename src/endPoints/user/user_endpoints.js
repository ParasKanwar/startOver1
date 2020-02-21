const express = require("express");
const router = express.Router();
const path = require("path");
const User = require(path.join(__dirname, "../../../models/users/user"));
const auth = require(path.join(__dirname, "../../../middleware/auth"));
// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send("can't find the user with given id");
//     }
//     return res.status(201).send(user);
//   } catch (e) {
//     return res.status(500).send(e.message);
//   }
// });

router.get("/user/me", auth, async (req, res) => {
  try {
    // const user = await User.find({
    //   name: { $regex: RegExp(`${req.query.name}`) }
    // });
    // if (user.length == 0)
    //  return res.status(404).send("No User Found");
    if (req.user) {
      const publicUser = req.user.getPublicProfile();
      return res.status(200).send(publicUser);
    }
    res.status(200).send("get Authenticate first");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.Email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(401).send(e.message);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(({ token }) => token != req.token);
    await req.user.save();
    res.send("Successfully Logeed Out...");
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("logged out of all users");
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// app.post("/users", (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then(r => {
//       res.send(r);
//     })
//     .catch(e => {
//       res.status(404).send("Not Able To FulFill Request ::: " + e.message);
//     });
// });

router.delete("/users/:id", async (req, res) => {
  try {
    const userToBeDeleted = await User.findByIdAndDelete(req.params.id);
    if (!userToBeDeleted) {
      return res.status(404).send("Find Nothing to be deleted!");
    }
    return res.send(userToBeDeleted);
  } catch (e) {
    return res.status(500).send("Error Deleting User");
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    // const isAvailable = await User.findOne({ Email: req.body.Email });
    // if (!!isAvailable) {
    //   return res.status(500).send("Email Already Exists");
    // }
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["name", "Email", "password", "age"];
  let isValidOperation = updates.every(element => {
    return validUpdates.includes(element);
  });
  if (!isValidOperation) {
    return res.status(400).send("invalid Update");
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach(update => (user[update] = req.body[update]));
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
