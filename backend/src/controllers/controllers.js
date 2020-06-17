import db from "../models/db";

export const Sync = async (req, res) => {
  try {
    const allThis = await db.Jogs.find();
    res.json({ allThis });
  } catch (error) {
    console.log(error);
  }
};

export const createJog = async (req, res) => {
  try {
    const date = req.body.date;
    const time = req.body.time;
    const distance = req.body.distance;
    const jog = await new db.Jogs({ date, time, distance }).save();
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
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
    const user = await new db.User({
      firstName,
      lastName,
      phone,
      email,
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
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const email = req.body.email;
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
