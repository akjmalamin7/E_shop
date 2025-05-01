const jwt = require("jsonwebtoken")
module.exports = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token && req.cookies && req.cookies.token) {
    token = `Bearer ${req.cookies.token}`;
  }
  if (!token) return res.status(401).json({status:"fail", message:"Access denied. No token provided!"});
  token = token.split(" ")[1].trim();
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({status:"fail",message:"Invalid token"})
  }
};
