const express = require('express');
const router = express.Router();
const userService = require('../userService');

router.get('/', async (req, res) => {
    res.json(await userService.getAllUsers());
});

router.get('/:id', async (req, res) => {
    res.json(await userService.getUserById(req.params.id));
})

router.post('/', async (req, res) => {
    const user = req.body;
    try {
        const response = await userService.addUser(user);
        res.json({ id: response.insertId });
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
})

router.put('/:id', async (req, res) => {
    const { id, user } = { id: req.params.id, user: req.body };

    try {
        await userService.editUser(id, user);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await userService.deleteUser(id);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
})

module.exports = router;