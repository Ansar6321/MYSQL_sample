console.clear();
const PORT = 3000;

const userService = require('./userService');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    res.json(await userService.getAllUsers());
});

app.get('/users/:id', async (req, res) => {
    res.json(await userService.getUserById(req.params.id));
})

app.post('/users', async (req, res) => {
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

app.put('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
})