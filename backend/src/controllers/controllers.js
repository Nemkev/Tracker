import db from "../models/db";

export const getAll = async (req, res) => {
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
