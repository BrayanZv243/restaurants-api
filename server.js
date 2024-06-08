require("dotenv").config();

// src/index.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const cors = require("cors");

//CORS
app.use(cors());

// Middleware parse JSON
app.use(express.json());

//Global configurations routes.
app.use(require("./routes/index"));

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api-docs/openapi.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connection to MongoDB
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB.");
    })
    .catch((err) => {
        console.error("Error to connect MongoDB.", err);
    });

// Index route.
app.get("/", (req, res) => {
    res.send("Welcome to Restaurants API.");
});

// Start server.
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
