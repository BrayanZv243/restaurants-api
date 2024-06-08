const { RestaurantDAO } = require("../data-access/RestaurantDAO");

class RestaurantController {
    static async getAllRestaurants(req, res) {
        try {
            const restaurants = await RestaurantDAO.getAllRestaurants();
            res.status(200).json(restaurants);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async getRestaurantByID(req, res) {
        try {
            let id = req.params.id;
            const restaurant = await RestaurantDAO.getRestaurantByID(id);
            res.status(200).json(restaurant);
        } catch (error) {
            switch (error) {
                case "Restaurant Not Found":
                    return res.status(404).json({ error });
                default:
                    return res.status(500).json({ error });
            }
        }
    }

    static async addRestaurant(req, res) {
        try {
            const restaurant = req.body;
            const restaurantAdded = await RestaurantDAO.addRestaurant(
                restaurant
            );
            res.status(200).json(restaurantAdded);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async updateRestaurant(req, res) {
        try {
            const id = req.params.id;
            const updatedRestaurantData = req.body; // Restaurant data updated

            // Update restaurant data from database
            const updatedRestaurant = await RestaurantDAO.updateRestaurant(
                id,
                updatedRestaurantData
            );

            // Return restaurant updated
            res.status(200).json(updatedRestaurant);
        } catch (error) {
            switch (error) {
                case "Restaurant Not Found":
                    return res.status(404).json({ error });
                default:
                    return res.status(500).json({ error });
            }
        }
    }

    static async deleteRestaurant(req, res) {
        try {
            const id = req.params.id;

            // Delete restaurant from database
            const deletedRestaurant = await RestaurantDAO.deleteRestaurant(id);

            // Return restaurant deleted.
            res.status(200).json({ deletedRestaurant });
        } catch (error) {
            switch (error) {
                case "Restaurante no encontrado":
                    return res.status(404).json({ error });
                default:
                    return res.status(500).json({ error });
            }
        }
    }
}

module.exports = RestaurantController;
