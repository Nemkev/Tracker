import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {
  Sync,
  createJog,
  updateJog,
  deleteJog,
  createUser,
  updateUser,
  deleteUser,
  filterDate,
  login,
  authenticateToken,
} from "./src/controllers/controllers";
import jwt from "jsonwebtoken";

mongoose.connect("mongodb://localhost:27017/Evgeny", {
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser());

app.get("/sync", authenticateToken, Sync);
app.post("/newJog", createJog);
app.put("/updateJog", updateJog);
app.delete("/deleteJog", deleteJog);
app.post("/newUser", createUser);
app.post("/filterDate", filterDate);
app.put("/updateUser", updateUser);
app.delete("/deleteUser", deleteUser);
app.post("/login", login);

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token === null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

// app.get("/api", (req, res) => {
//   res.json({
//     message: "Welcome to the API",
//   });
// });

// app.post("/api/posts", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created...",
//         authData,
//       });
//     }
//   });
// });

// app.post("/api/login", (req, res) => {
//   const user = {
//     id: 1,
//     username: "brad",
//     email: "brad@gmail.com",
//   };

//   jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
//     res.json({
//       token,
//     });
//   });
// });

// // FORMAT OF TOKEN
// // Authorization: Bearer <access_token>

// // Verify Token
// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers["authorization"];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== "undefined") {
//     // Split at the space
//     const bearer = bearerHeader.split(" ");
//     // Get token from array
//     const bearerToken = bearer[1];
//     // Set the token
//     req.token = bearerToken;
//     // Next middleware
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// }

// app.listen(5000, () => console.log("Server started on port 5000"));
