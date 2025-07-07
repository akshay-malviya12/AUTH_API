import { Router } from "express";
import db from "./database.js";

const router = Router();

// Create service under a category............
router.post("/category/:categoryId/service", async (req, res) => {

    const { name, type, priceOptions } = req.body;
    const { categoryId } = req.params;

    if (!categoryId) {
        return res.status(400).json({ message: "Please provide Category ID" });
    }
    if (!name || !type || !priceOptions) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    db.query(
        `INSERT INTO service (service_name, category_id, type, price_options) VALUES (?, ?, ?, ?)`,
        [name, categoryId, type, priceOptions], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            console.log('Service ID:', result.insertId);
            return res.status(201).json({ message: "Service created successfully" });
        });
});

//  Get all services under a category................
router.get("/category/:categoryId/services", async (req, res) => {
    const { categoryId } = req.params;

    if (!categoryId) {
        return res.status(400).json({ message: "Please provide Category ID" });
    }

    db.query(
        `SELECT * FROM service WHERE category_id = ?`,
        [categoryId], (err, services) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ services });
        });
});

//Get single service under a category.....................
router.get("/category/:categoryId/service/:serviceId", async (req, res) => {
    const { categoryId, serviceId } = req.params;

    if (!categoryId && !serviceId) {
        return res.status(400).json({ message: "Please provide Category ID AND ServiceId" });
    }

    db.query(`SELECT * FROM service WHERE category_id = ? AND id=? `,
        [categoryId, serviceId], (err, services) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }

            db.query(`SELECT * FROM price WHERE service_id = ?  `,
                [serviceId], (err, price) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ message: err.message });
                    }

                    return res.status(200).json({ services, price });
                });
        });
});

//Update a specific service under a category
router.put("/category/:categoryId/service/:serviceId", async (req, res) => {
    const { duration, name, price, priceAction, priceId, priceOptions, priceType, type } = req.body;
    const { categoryId, serviceId } = req.params;

    if (!categoryId && !serviceId) {
        return res.status(400).json({ message: "Please provide Category ID and Service ID" });
    }

    if (!name && !type && !priceOptions && !duration && !priceType && !price) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    db.query(
        `UPDATE service SET service_name = ?, type = ?,price_options = ? WHERE id = ? AND category_id = ?`,
        [name, type, priceOptions, serviceId, categoryId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            const servicePriceData = { "service_id": serviceId, "duration": duration, "price": price, "type": priceType, "priceId": priceId }

            let success = false;

            switch (priceAction) {
                case "add":
                    addPrice(servicePriceData, (err, result) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({ message: err.message });
                        }
                    })
                    success = true;
                    break;
                case "update":
                    updatePrice(servicePriceData, (err, result) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({ message: err.message });
                        }
                    })
                    success = true;
                    break;
                case "delete":
                    deletePrice(servicePriceData, (err, result) => {
                        if (err) {
                            console.error("Database error:", err);
                            return res.status(500).json({ message: err.message });
                        }
                    })
                    success = true;
                    break;
                default:
                    console.log("NO Actions..")

            }

            if (success) {
                return res.status(200).json({ message: "Service updated successfully" });
            }
        });
});

//add price based on service update......
const addPrice = (servicePriceData, callback) => {
    db.query(
        `INSERT INTO price (service_id,duration, price,type) VALUES (?, ?, ?, ?)`,
        [servicePriceData.service_id, servicePriceData.duration, servicePriceData.price, servicePriceData.type], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });

}
//update price based on service update......
const updatePrice = (servicePriceData, callback) => {
    db.query(
        `UPDATE price SET duration=?, type=? ,price=? WHERE service_id= ? AND id=? `,
        [servicePriceData.duration, servicePriceData.type, servicePriceData.price, servicePriceData.service_id, servicePriceData.priceId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
}
//delete price based on service update......
const deletePrice = (servicePriceData, callback) => {
    db.query(
        `DELETE FROM price WHERE service_id= ? AND id=?`,
        [servicePriceData.service_id, servicePriceData.priceId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        }
    );
}


// Delete a service under a category................
router.delete("/category/:categoryId/service/:serviceId", async (req, res) => {
    const { categoryId, serviceId } = req.params;

    if (!categoryId || !serviceId) {
        return res.status(400).json({ message: "Please provide Category ID and Service ID" });
    }

    db.query(
        `DELETE FROM service WHERE id = ? AND category_id = ?`,
        [serviceId, categoryId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: "Service deleted successfully" });
        }
    );
});

export default router;


