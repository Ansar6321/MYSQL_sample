console.clear();
const PORT = 3000;

const userController = require('./controllers/usersController')
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <h1><a href="http://localhost:3000/users">Go to users url to get all users</a></h1>
    `)
})

app.use('/users', userController);

app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
})