const User = require("../models/users/user");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verified = jwt.verify(token, "Thisismyauthcharacterstring");
    const user = await User.findOne({
      _id: verified._id,
      "tokens.token": token
    });
    if (user) {
      return res.send("Please Authenticate");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send("Please Authorize");
  }
};

module.exports = auth;
