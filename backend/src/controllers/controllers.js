require("dotenv").config();
import db from "../models/db";
import jwt from "jsonwebtoken";

export const Sync = async (req, res) => {
  try {
    const userId = req.body.userId;
    const allThis = await db.Jogs.find({ userId });
    res.json({ allThis });
  } catch (error) {
    console.log(error);
  }
};

export const createJog = async (req, res) => {
  try {
    const userId = req.body.userId;
    const date = req.body.date;
    const time = req.body.time;
    const distance = req.body.distance;
    const jog = await new db.Jogs({ userId, date, time, distance }).save();
    res.send(jog);
  } catch (error) {
    console.log(error);
  }
};

export const deleteJog = async (req, res) => {
  try {
    const id = req.body.id;
    const jog = await db.Jogs.findByIdAndRemove(id);
    res.send(true);
  } catch (error) {
    console.log(error);
  }
};

export const updateJog = async (req, res) => {
  try {
    const id = req.body.id;
    const date = req.body.date;
    const time = req.body.time;
    const distance = req.body.distance;
    const jog = await db.Jogs.findByIdAndUpdate(id, {
      date,
      time,
      distance,
    });
    res.send(jog);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const user = await new db.User({
      firstName,
      lastName,
      phone,
      email,
      password,
    }).save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await db.User.findByIdAndRemove(id);
    res.send(true);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, firstName, lastName, phone, email } = req.body;
    const user = await db.User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phone,
      email,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const filterDate = async (req, res) => {
  try {
    const { userId, startDate, finishDate } = req.body;
    const filteredData = await db.Jogs.find({
      userId,
      date: { $gte: `${startDate}`, $lte: `${finishDate}` },
    }).sort({ date: 1 });
    res.send(filteredData);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.User.findOne({ email, password });
    // console.log(password, 111);
    // console.log(user.password, 222);
    // const check = db.User.find({ email, password });
    // console.log(check);
    // if (!check) {
    //   res.sendStatus(403);
    // }
    // if (user.password === password) {
    //   return null;
    // }
    if (!user) {
      res.sendStatus(403);
    }
    res.json({ user });
    // const user = { email };
    // const accessToken = generateAccessToken(user);
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });
};

// const generateRefreshToken = (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken) return res.sendStatus(401);
//   if()
// };
