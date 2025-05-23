const express = require("express");
const app = new express();
const path = require("path");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
/* security middleware */
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const router = require("./src/routes/api")
/* cors */
const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN || "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
/* security */
app.use(
  helmet({
    crossOriginResourcePolicy: false, // অথবা { policy: "cross-origin" }
  })
);

app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

/* #==#body parser#==# */

app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
/* request rate limit */
const limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(limiter);

app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1",router)
app.use(express.static("../../frontend/eshop/dist"))
/* router */
app.get("/",(req,res)=>{
  res.status(200).json({message:"Welcome E-Shop"})
})
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'../../frontend/eshop','dist','index.html'))
})

module.exports = app