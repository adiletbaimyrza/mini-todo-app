"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const TodoController_1 = require("./controllers/TodoController");
const initialTodos_1 = __importDefault(require("./data/initialTodos"));
const TodoRepository_1 = require("./repositories/TodoRepository");
const todoRoutes_1 = require("./routes/todoRoutes");
const TodoService_1 = require("./services/TodoService");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const todoRepository = new TodoRepository_1.TodoRepository(initialTodos_1.default);
const todoService = new TodoService_1.TodoService(todoRepository);
const todoController = new TodoController_1.TodoController(todoService);
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
app.use('/api/todos', (0, todoRoutes_1.createTodoRoutes)(todoController));
app.listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});
