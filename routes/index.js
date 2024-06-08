const express = require("express");
const app = express();

// API Routes.
app.use(require("./restaurants"));

module.exports = app;
