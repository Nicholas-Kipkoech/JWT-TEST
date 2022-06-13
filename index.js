const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "welcome to the API",
  });
});
app.post("/api/posts", verifyToken, (req, res) => {
  json.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "posts created....",
        authData,
      });
    }
  });
});
app.post("/api/login", (req, res) => {
  //mock user
  const user = {
    id: 1,
    username: "nickey",
    email: "nickey@gmail.com",
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token,
    });
  });
});
function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];
    //set token
    res.token = bearerToken;
    //next middleware
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}
app.listen(8080, () => console.log("server listening on port 8080"));
