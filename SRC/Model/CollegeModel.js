const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be provided"],
      unique: [true, "Name already exist"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name must be provided"],
      trim: true,
    },
    logoLink: { type: String, required: [true, "Logo link must be provided"] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);