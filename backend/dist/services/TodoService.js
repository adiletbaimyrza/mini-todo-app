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
exports.TodoService = void 0;
class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    createTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const newTodo = {
                name: todo.name,
                isCompleted: todo.isCompleted,
                dueDate: (_a = todo.dueDate) !== null && _a !== void 0 ? _a : null,
                completionDate: (_b = todo.completionDate) !== null && _b !== void 0 ? _b : null,
            };
            return this.todoRepository.create(newTodo);
        });
    }
    getTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.getById(id);
        });
    }
    getAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.getAll();
        });
    }
    updateTodo(id, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const existingTodo = yield this.todoRepository.getById(id);
            if (!existingTodo) {
                return null;
            }
            const fieldsToUpdate = {
                name: updatedFields.name,
                isCompleted: updatedFields.isCompleted,
                dueDate: (_a = updatedFields.dueDate) !== null && _a !== void 0 ? _a : null,
                completionDate: (_b = updatedFields.completionDate) !== null && _b !== void 0 ? _b : null,
            };
            return this.todoRepository.update(id, fieldsToUpdate);
        });
    }
    deleteTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTodo = yield this.todoRepository.getById(id);
            if (!existingTodo) {
                return false;
            }
            return this.todoRepository.delete(id);
        });
    }
}
exports.TodoService = TodoService;
