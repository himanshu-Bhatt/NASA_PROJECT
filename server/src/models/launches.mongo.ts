import mongoose from "mongoose";

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
    ref: "Planet",
  },
  mission: {
    type: String,
  },
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
    required: true,
  },
  customer: {
    type: [String],
  },
});

export const launchModel = mongoose.model("Launch", launchSchema);
