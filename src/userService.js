const pool = require('./connect');

class UserService {
    async getAllUsers() {
        const conn = await pool.getConnection();
        const [response,] = await conn.query('SELECT * FROM users');
        console.log(response);
        conn.release();
        return response;
    }

    async getUserById(id) {
        const conn = await pool.getConnection();

        const [response,] = await conn.query('SELECT * FROM users WHERE id = ?', id);

        conn.release();

        console.log(response);
        return response;
    }

    async addUser(user) {
        const conn = await pool.getConnection();
        if (user.name && user.age && user.email) {
            const [response,] = await conn.query('INSERT INTO users (name, age, email) VALUES (?, ? ,?)', [user.name, user.age, user.email])
            console.log(response);
            conn.release();
            return response;
        } else {
            conn.release();
            throw new Error('Invalid user model.');
        }
    }

    async editUser(id, user) {
        const conn = await pool.getConnection();

        if (user.name || user.age || user.email) {

            const data = [];
            let query = 'UPDATE users SET ';
            if (user.name) {
                query += 'name = ?, ';
                data.push(user.name);
            }
            if (user.age) {
                query += 'age = ?, ';
                data.push(user.age)
            }
            if (user.email) {
                query += 'email = ?, ';
                data.push(user.email);
            }
            query = query.slice(0, query.length - 2) + ' WHERE id = ?'
            data.push(id);

            const [response,] = await conn.query(query, data);

            conn.release();

            console.log(response);

            return response;
        } else {
            conn.release();
            throw new Error('Invalid user model. At least one field should exists');
        }
    }

    async deleteUser(id) {
        const conn = await pool.getConnection();

        if (id) {
            const [response,] = await conn.query('DELETE FROM users WHERE id = ?', [id]);

            conn.release();

            console.log(response);
            return response;
        } else {
            conn.release();
            throw new Error('Id is required.');
        }
    }
}

module.exports = new UserService();