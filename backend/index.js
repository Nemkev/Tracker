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

mongoose.connect("mongodb://localhost:27017/Evgeny", {
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser());

app.get("/sync", authenticateToken, Sync);
app.post("/newJog", authenticateToken, createJog);
app.put("/updateJog", authenticateToken, updateJog);
app.delete("/deleteJog", authenticateToken, deleteJog);
app.post("/newUser", createUser);
app.post("/filterDate", authenticateToken, filterDate);
app.put("/updateUser", updateUser);
app.delete("/deleteUser", deleteUser);
app.post("/login", login);

app.listen(3000, function () {
  console.log("http://localhost:3000/");
});
