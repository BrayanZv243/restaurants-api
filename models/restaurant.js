const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Restaurant Schema for mongodb.
const restaurantSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 4,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    site: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
});

// Create restaurant model.
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// Export model.
module.exports = Restaurant;
