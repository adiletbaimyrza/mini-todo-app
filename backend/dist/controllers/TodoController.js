"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, dueDate, isCompleted, completionDate } = req.body;
                const newTodo = {
                    name,
                    dueDate,
                    isCompleted,
                    completionDate,
                };
                const createdTodo = yield this.todoService.createTodo(newTodo);
                res.status(201).json(createdTodo);
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Failed to create todo',
                });
            }
        });
        this.getAllTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield this.todoService.getAllTodos();
                res.status(200).json(todos);
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Failed to fetch todos',
                });
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, dueDate, isCompleted, completionDate } = req.body;
                const updatedFields = {
                    name,
                    dueDate,
                    isCompleted,
                    completionDate,
                };
                if (!id || isNaN(parseInt(id))) {
                    res.status(400).json({ error: 'Invalid or missing "id" parameter.' });
                    return;
                }
                const todoId = parseInt(id);
                const updatedTodo = yield this.todoService.updateTodo(todoId, updatedFields);
                if (!updatedTodo) {
                    res.status(404).json({ error: `Todo with id ${id} not found.` });
                    return;
                }
                res.status(200).json(updatedTodo);
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Failed to update todo',
                });
            }
        });
        this.getTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || isNaN(parseInt(id))) {
                    res.status(400).json({ error: 'Invalid or missing "id" parameter.' });
                    return;
                }
                const todoId = parseInt(id);
                const todo = yield this.todoService.getTodo(todoId);
                if (!todo) {
                    res.status(404).json({ error: `Todo with id ${id} not found.` });
                    return;
                }
                res.status(200).json(todo);
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Failed to fetch todo',
                });
            }
        });
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id || isNaN(parseInt(id))) {
                    res.status(400).json({ error: 'Invalid or missing "id" parameter.' });
                    return;
                }
                const todoId = parseInt(id);
                const success = yield this.todoService.deleteTodo(todoId);
                if (!success) {
                    res.status(404).json({ error: `Todo with id ${id} not found.` });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : 'Failed to delete todo',
                });
            }
        });
    }
}
exports.TodoController = TodoController;
