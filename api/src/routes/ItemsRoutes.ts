import express, { Request, Response } from "express";
import { ItemsDA } from "../DA/ItemsDA";
import { Item } from "../models/Item";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         itemid:
 *           type: integer
 *           description: Auto-generated ID of the item
 *         description:
 *           type: string
 *           description: Description of the item
 *         category:
 *           type: string
 *           description: Category of the item
 *         imagepath:
 *           type: string
 *           description: URL or path to the image
 *         dateposted:
 *           type: string
 *           format: date-time
 *           description: Date the item was posted
 *         status:
 *           type: string
 *           enum: [Lost, Found, Returned]
 *           description: Status of the item
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 itemId:
 *                   type: integer
 */
router.post("/", async (req: Request, res: Response) =>
{
    try
    {
        const item: Item = req.body;
        const newId = await ItemsDA.create(item);
        res.status(201).json({ message: "Item created", itemId: newId });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to create item" });
    }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to fetch
 *     responses:
 *       200:
 *         description: Item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
router.get("/:id", async (req: Request, res: Response) =>
{
    try
    {
        const id = Number(req.params.id);
        const item = await ItemsDA.read(id);
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch item" });
    }
});

/**
 * @swagger
 * /items:
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: ItemId is required
 *       500:
 *         description: Internal server error
 */
router.put("/", async (req: Request, res: Response) =>
{
    try
    {
        const item: Item = req.body;
        if (!item.itemid)
            return res.status(400).json({ message: "ItemId is required" });

        await ItemsDA.update(item);
        res.json({ message: "Item updated successfully" });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to update item" });
    }
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get("/", async (_req: Request, res: Response) =>
{
    try
    {
        const items = await ItemsDA.getAll();
        res.json(items);
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req: Request, res: Response) =>
{
    try
    {
        const id = Number(req.params.id);
        await ItemsDA.delete(id);
        res.json({ message: "Item deleted successfully" });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

export default router;
