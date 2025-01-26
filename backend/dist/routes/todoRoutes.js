"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodoRoutes = void 0;
const express_1 = require("express");
const validateTodoPayload_1 = require("../middlewares/validateTodoPayload");
const createTodoRoutes = (todoController) => {
    const router = (0, express_1.Router)();
    router.get('/', todoController.getAllTodos);
    router.get('/:id', todoController.getTodo);
    router.post('/', validateTodoPayload_1.validateTodoPayload, todoController.createTodo);
    router.patch('/:id', validateTodoPayload_1.validateTodoPayload, todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);
    return router;
};
exports.createTodoRoutes = createTodoRoutes;
