import { Router } from "express";
import { UserItemsDA } from "../DA/UserItemsDA";
import { UserItem } from "../models/UserItem";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: UserItems
 *   description: API for managing user-posted items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserItem:
 *       type: object
 *       properties:
 *         useritemid:
 *           type: integer
 *           description: Auto-generated ID of the user item
 *         postedbyuserid:
 *           type: integer
 *           description: ID of the user who posted the item
 *         locationid:
 *           type: integer
 *           nullable: true
 *           description: ID of the location (optional)
 *         itemid:
 *           type: integer
 *           description: ID of the item
 *         isfound:
 *           type: boolean
 *           description: Whether the item has been found
 *         dateposted:
 *           type: string
 *           format: date-time
 *           description: Date the user item was posted
 */

/**
 * @swagger
 * /useritems:
 *   get:
 *     summary: Get all user items
 *     tags: [UserItems]
 *     responses:
 *       200:
 *         description: List of all user items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserItem'
 */
router.get("/", async (_req, res, next) =>
{
    try
    {
        const userItems = await UserItemsDA.getAll();
        res.json(userItems);
    } catch (err)
    {
        next(err);
    }
});

/**
 * @swagger
 * /useritems/{id}:
 *   get:
 *     summary: Get a user item by ID
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item
 *     responses:
 *       200:
 *         description: User item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserItem'
 *       404:
 *         description: User item not found
 */
router.get("/:id", async (req, res, next) =>
{
    try
    {
        const id = parseInt(req.params.id);
        const userItem = await UserItemsDA.read(id);
        if (!userItem) return res.status(404).json({ message: "User item not found" });
        res.json(userItem);
    } catch (err)
    {
        next(err);
    }
});

/**
 * @swagger
 * /useritems:
 *   post:
 *     summary: Create a new user item
 *     tags: [UserItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserItem'
 *     responses:
 *       201:
 *         description: User item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 useritemid:
 *                   type: integer
 */
router.post("/", async (req, res, next) =>
{
    try
    {
        const userItem: UserItem = req.body;
        const id = await UserItemsDA.create(userItem);
        res.status(201).json({ useritemid: id });
    } catch (err)
    {
        next(err);
    }
});

/**
 * @swagger
 * /useritems/{id}:
 *   put:
 *     summary: Update a user item
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserItem'
 *     responses:
 *       204:
 *         description: User item updated successfully
 *       400:
 *         description: useritemid is required
 */
router.put("/:id", async (req, res, next) =>
{
    try
    {
        const useritemid = parseInt(req.params.id);
        const userItem: UserItem = { ...req.body, useritemid };
        await UserItemsDA.update(userItem);
        res.status(204).send();
    } catch (err)
    {
        next(err);
    }
});

/**
 * @swagger
 * /useritems/{id}:
 *   delete:
 *     summary: Delete a user item
 *     tags: [UserItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user item to delete
 *     responses:
 *       204:
 *         description: User item deleted successfully
 */
router.delete("/:id", async (req, res, next) =>
{
    try
    {
        const id = parseInt(req.params.id);
        await UserItemsDA.delete(id);
        res.status(204).send();
    } catch (err)
    {
        next(err);
    }
});

export default router;
