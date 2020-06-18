import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: true,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  phone: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    required: true,
    default: "user",
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

export default mongoose.model("User", User);
