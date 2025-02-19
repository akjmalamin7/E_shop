const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const userModel = model("user", UuerSchema);
module.exports = userModel;
