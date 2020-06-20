import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
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
  testDelete,
  testGet,
  testPost,
  testPut,
} from "./src/controllers/controllers";

mongoose.connect("mongodb://localhost:27017/Evgeny", {
  useFindAndModify: false,
});

const app = express();
app.use(bodyParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.post("/sync", authenticateToken, Sync);
app.post("/v1/data/jog", authenticateToken, createJog);
app.put("/v1/data/jog", authenticateToken, updateJog);
app.delete("/v1/data/jog", authenticateToken, deleteJog);
app.post("/v1/data/user", createUser);
app.post("/filterDate", authenticateToken, filterDate);
app.put("/v1/data/user", updateUser);
app.delete("/v1/data/user", deleteUser);

app.delete("/v1/test/echo", testDelete);
app.get("/v1/test/echo", testGet);
app.post("/v1/test/echo", testPost);
app.put("/v1/test/echo", testPut);

app.post("/login", login);

app.listen(4000, function () {
  console.log("http://localhost:4000/");
});
