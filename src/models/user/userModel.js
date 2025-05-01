const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken")
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    otp: { type: String, required: true, minlength:4,maxlength:4 },
  },
  { timestamps: true, versionKey: false }
);
userSchema.methods.generateJWT = function(){
  let token = jwt.sign({
    _id:this._id,
    email:this.email
  }, process.env.SECRET_KEY,{ expiresIn: "1d" })
  return token;
}
const userModel = model("users", userSchema);
module.exports = userModel;
