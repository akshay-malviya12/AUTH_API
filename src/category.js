import { Router } from "express";
import db from "./database.js";

const router = Router();

// Create Category......
router.post("/category", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please provide category name" });
    }
    db.query(
        `INSERT INTO category (category_name) VALUES (?)`,
        [name], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            console.log('Category ID:', result.insertId);
            res.status(201).json({ message: "Category created successfully" });
        });
});

// Get All Categories.........
router.get("/categories", (req, res) => {

    db.query(`SELECT * FROM category`, (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ categories: rows });
    });
});

//Get single Category..........
router.get("/single-category/:id", (req, res) => {
    const categoryId = req.params.id;
    console.log("categoryId", categoryId)
    db.query(`SELECT * FROM category WHERE id=?`, [categoryId], (err, rows) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ categories: rows });
    });
});

// Update Category............
router.put("/category/:categoryId", (req, res) => {
    const { name } = req.body;
    const { categoryId } = req.params;

    if (!name || !categoryId) {
        return res.status(400).json({ message: "Please provide both name and category ID" });
    }

    db.query(
        `UPDATE category SET category_name = ? WHERE id = ?`,
        [name, categoryId], (err, rows) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }
            console.log(rows)
            return res.status(200).json({ message: "Category updated successfully" });
        });
});

// Delete Category............
router.delete("/category/:categoryId", (req, res) => {
    const { categoryId } = req.params;

    // Check if any services exist for this category
    db.query(
        `SELECT * FROM service WHERE id = ?`,
        [categoryId], (err, rows) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: err.message });
            }

            if (rows.length > 0) {
                return res.status(400).json({
                    message: "Category can't be deleted because services exist under it"
                });
            }

            db.query(
                `DELETE FROM category WHERE id = ?`,
                [categoryId], (err, rows) => {
                    if (err) {
                        console.error("Database error:", err);
                        return res.status(500).json({ message: err.message });
                    }
                    console.log(rows)
                    return res.status(200).json({ message: "Category deleted successfully" });
                });
        });
});

export default router;
