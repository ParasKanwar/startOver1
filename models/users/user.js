const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const schema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "Anonymous" },
    Email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.default.isEmail(value))
          throw new Error("Please Enter Valid Email");
      }
    },
    age: {
      type: Number,
      validate(val) {
        if (val < 0) throw new Error("Age Can Not Be negative");
      },
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate(val) {
        if (val.toLowerCase().includes("password"))
          throw new Error("Password can not be password");
      },
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000
    }
  }
);

schema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "Thisismyauthcharacterstring"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
schema.methods.getPublicProfile = function() {
  const user = this.toObject();
  delete user.tokens;
  delete user.password;
  return user;
};
schema.statics.findByCredentials = async (Email, password) => {
  const user = await User.findOne({ Email });
  if (!user) {
    throw new Error("Unable To login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

schema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password"))
    user.password = await bcrypt.hash(user.password, 8);
  next();
});
const User = mongoose.model("user", schema);

module.exports = User;
