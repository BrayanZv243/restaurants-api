const express = require("express");
const router = express.Router();

// Controllers.
const RestaurantController = require("../controllers/RestaurantsController");

// It receives a latitude and a longitude as parameters,
// which correspond to the center of a circle,
// and a third parameter that corresponds to a radius in METERS.
router.get(
    "/restaurant/statistics",
    RestaurantController.getCountAvgAndStdOfRestaurantsInTheCircle
);

// Get all restaurants.
router.get("/restaurant", RestaurantController.getAllRestaurants);

// Get restaurant by ID.
router.get("/restaurant/:id", RestaurantController.getRestaurantByID);

// Save restaurant.
router.post("/restaurant", RestaurantController.addRestaurant);

// Update restaurant.
router.put("/restaurant/:id", RestaurantController.updateRestaurant);

// Delete restaurant by ID.
router.delete("/restaurant/:id", RestaurantController.deleteRestaurant);

module.exports = router;
