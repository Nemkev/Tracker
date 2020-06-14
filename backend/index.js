import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { getAll, createJog } from "./src/controllers/controllers";
// import { Hell } from "./src/models/db";

mongoose.connect("mongodb://localhost:27017/Evgeny", {
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser());

app.get("/test", getAll);

app.post("/newJog", createJog);

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
