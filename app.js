const express = require("express");
const app = new express();
const path = require("path");
const bodyParser = require("body-parser");

/* security middleware */
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
/* cors */
const corsOptions = {
  origin: process.env.CORS_ALLOW_ORIGIN || "http://localhost:5173",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));