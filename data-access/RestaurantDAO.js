const Restaurant = require("../models/restaurant");

class RestaurantDAO {
    constructor() {}

    static async getAllRestaurants() {
        try {
            // Find and returs all restaurants in the database
            return await Restaurant.find({});
        } catch (error) {
            throw error.message;
        }
    }

    static async getRestaurantByID(id) {
        try {
            // Find the restaurant by its UUID in the database
            const restaurant = await Restaurant.findOne({ id }).exec();

            // Check if the restaurant is not found
            if (!restaurant) throw new Error("Restaurant Not Found");

            // Return object with the found restaurant
            return restaurant;
        } catch (error) {
            throw error.message;
        }
    }

    static async addRestaurant(restaurant) {
        try {
            // Create a new Restaurant instance with provided data
            const res = new Restaurant({
                rating: restaurant.rating,
                name: restaurant.name,
                site: restaurant.site,
                email: restaurant.email,
                phone: restaurant.phone,
                street: restaurant.street,
                city: restaurant.city,
                state: restaurant.state,
                lat: restaurant.lat,
                lng: restaurant.lng,
            });

            // Save the new Restaurant to the database
            const resDB = await res.save();

            // Return object with the new Restaurant.
            return resDB;
        } catch (error) {
            throw error.message;
        }
    }

    static async updateRestaurant(restaurantID, updatedRestaurantData) {
        try {
            // Seek restaurant by its ID and update with the new data provided.
            const updatedRestaurant = await Restaurant.findOneAndUpdate(
                { id: restaurantID }, // Seek restaurant by property "id"
                updatedRestaurantData,
                { new: true } // returns the updated restaurant
            );

            // If restaurant doesnt exists, throw error.
            if (!updatedRestaurant) {
                throw new Error("Restaurant Not Found");
            }

            // Return updated restaurant.
            return updatedRestaurant;
        } catch (error) {
            throw error.message;
        }
    }

    static async deleteRestaurant(restaurantID) {
        try {
            // Seek restaurant by its ID and delete
            const deletedRestaurant = await Restaurant.findOneAndDelete(
                { id: restaurantID }, // Seek restaurant by property "id"
                { new: true } // Returns the deleted restaurant
            );

            // If restaurant doesnt exists, throw error.
            if (!deletedRestaurant) {
                throw new Error("Restaurant Not Found");
            }

            // Return restaurant deleted.
            return deletedRestaurant;
        } catch (error) {
            throw error.message;
        }
    }

    /**
     * This method calculates the count, average rating, and
     * standard deviation of restaurants within a given circle defined by
     * latitude, longitude, and radius.
     * @param {number} latitude - The latitude of the center of the circle.
     * @param {number} longitude - The longitude of the center of the circle.
     * @param {number} radius - The radius of the circle in meters.
     * @returns {Object} An object containing the count of restaurants,
     * average rating, and standard deviation.
     */
    static async getCountAvgAndStdOfRestaurantsInTheCircle(
        latitude,
        longitude,
        radius
    ) {
        try {
            const lat = parseFloat(latitude);
            const lng = parseFloat(longitude);
            const radiusInMeters = parseFloat(radius);

            const radiusInDegrees = radiusInMeters / 111111; // Approximate number of meters in one degree of latitude

            // Perform query to find restaurants within the radial distance
            const restaurantsWithinRadius = await Restaurant.find({
                lat: {
                    $gt: lat - radiusInDegrees,
                    $lt: lat + radiusInDegrees,
                },
                lng: {
                    $gt: lng - radiusInDegrees,
                    $lt: lng + radiusInDegrees,
                },
            });
            // Calculate count, average rating, and standard deviation
            const count = restaurantsWithinRadius.length;

            // Extract ratings of restaurants within the circle
            const ratings = restaurantsWithinRadius.map(
                (restaurant) => restaurant.rating
            );

            // Calculate the average rating
            const avg =
                ratings.reduce((acc, rating) => acc + rating, 0) / count;

            // Calculate the standard deviation
            const std = Math.sqrt(
                ratings.reduce(
                    (acc, rating) => acc + Math.pow(rating - avg, 2),
                    0
                ) / count
            );

            return { count, avg, std }; // Return count, average rating, and standard deviation
        } catch (error) {
            throw error.message; // Throw an error if there's any exception
        }
    }
}

module.exports = { RestaurantDAO };
