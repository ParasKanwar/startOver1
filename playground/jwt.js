const jwt = require("jsonwebtoken");

const a = () => {
  const sign = jwt.sign({ _id: "9087" }, "helloworld", {
    expiresIn: "50 seconds"
  });
  setTimeout(() => {
    console.log("From 59 seconds" + jwt.verify(sign, "helloworld"));
  }, 49000);
  setTimeout(() => {
    console.log("From 59 seconds" + jwt.verify(sign, "helloworld"));
  }, 59000);
  console.log(jwt.verify(sign, "helloworld"));
};
a();
