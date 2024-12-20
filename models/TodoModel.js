// Database connection
const db = require('../db_connect');

class Todo {
    // Get all todos from the database
    static getAll() {
        const query = `SELECT * FROM todos`;
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Get an todo by their ID
    static getById(todoId) {
        const query = `
            SELECT * FROM todos WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            db.all(query, [todoId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Add a new todo to the database
    static addTodo(todoData) {
        const { title, description, user_id, due_date, status } = todoData;
        const query = `
            INSERT INTO todos (title, description, user_id, due_date, status)
            VALUES (?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            db.run(
                query,
                [title, description, user_id, due_date, status],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                }
            );
        });
    }

    // Update todo data by their ID
    static updateTodo(todoId, todoData) {
        const { title, description, user_id, due_date, status } = todoData;
        const query = `
            UPDATE todos
            SET title = ?, description = ?, user_id = ?, due_date = ?, status = ?
            WHERE id = ?
        `;
        return new Promise((resolve, reject) => {
            db.run(
                query,
                [title, description, user_id, due_date, status, todoId],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ updated: this.changes });
                    }
                }
            );
        });
    }

    // Delete an todo from the database by ID
    static deleteTodo(todoId) {
        const query = 'DELETE FROM todos WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [todoId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ deleted: this.changes });
                }
            });
        });
    }
}

// Export the Todo class for use in other parts of the application
module.exports = Todo;
