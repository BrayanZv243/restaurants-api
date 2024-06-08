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
}

module.exports = { RestaurantDAO };
