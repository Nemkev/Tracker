import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Jogs = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  distance: {
    type: Schema.Types.String,
    required: true,
  },
  time: {
    type: Schema.Types.String,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    required: true,
  },
  speed: {
    type: Schema.Types.String,
    required: true,
  },
});

export default mongoose.model("Jogs", Jogs);
