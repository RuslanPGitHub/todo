// Importing the Express module
const express = require('express');

// Creating an Express Router object
const router = express.Router();

// Importing the controller for todos
const TodoController = require('../controllers/TodoController');
const AuthController = require('../controllers/AuthController');

// Route to get all todos
router.get('/', (req, res) => TodoController.getTodosHandler(req, res));

// Route to display the form for adding a new todo
router.get('/add/', (req, res) =>
    TodoController.getTodoAddHandler(req, res)
);

// Route to handle the addition of a new todo
router.post('/add/', (req, res) =>
    TodoController.postTodoAddHandler(req, res)
);

// Route to display the form for updating an todo
router.get('/update/:todoId', (req, res) =>
    TodoController.getTodoUpdateHandler(req, res)
);

// Route to handle the update of an todo
router.post('/update/:todoId', (req, res) =>
    TodoController.postTodoUpdateHandler(req, res)
);

// Route to delete an todo by their ID
router.delete('/delete/:todoId', (req, res) =>
    TodoController.deleteTodoHandler(req, res)
);

// Exporting the router for use in other parts of the application
module.exports = router;
