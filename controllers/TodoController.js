// Importing the Todo model
const Todo = require('../models/TodoModel');

class TodoController {
    // Get all Todos
    async getTodosHandler(req, res) {
        try {
            const todos = await Todo.getAll();

            res.render('TodoView', { todos });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get the view with the form for adding todos
    async getTodoAddHandler(req, res) {
        try {
            res.render('TodoAddView');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Method for adding an todo
    async postTodoAddHandler(req, res) {
        try {
            const lastID = await Todo.addTodo(req.body);
            res.render('TodoAddView', { lastID });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Get the view with the form for updating an todo
    async getTodoUpdateHandler(req, res) {
        try {
            const todoId = req.params.todoId;
            const todo = await Todo.getById(todoId);
            res.render('TodoUpdateView', { todo });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Method for updating an todo
    async postTodoUpdateHandler(req, res) {
        try {
            const todoId = req.params.todoId;
            const todoData = req.body;
            const result = await Todo.updateTodo(todoId, todoData);

            if (result.updated) {
                res.redirect('/');
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // Method for deleting an todo
    async deleteTodoHandler(req, res) {
        const todoId = req.params.todoId;
        try {
            const result = await Todo.deleteTodo(todoId);
            if (result.deleted) {
                res.status(200).json({
                    message: 'Todo deleted successfully',
                });
            } else {
                res.status(404).json({ message: 'Todo not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

// Exporting the controller class
module.exports = new TodoController();
