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
exports.TodoRepository = void 0;
class TodoRepository {
    constructor(initialTodos) {
        this.initialTodos = initialTodos;
        this.todos = new Map();
        this.currentId = 1;
        if (this.initialTodos) {
            this.initialTodos.forEach((todo) => {
                this.todos.set(todo.id, todo);
                if (todo.id >= this.currentId) {
                    this.currentId = todo.id + 1;
                }
            });
        }
    }
    create(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            const newTodo = Object.assign({ id: this.currentId }, todo);
            this.todos.set(newTodo.id, newTodo);
            this.currentId++;
            return newTodo;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Array.from(this.todos.values());
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todos.get(id) || null;
        });
    }
    update(id, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingTodo = yield this.getById(id);
            if (!existingTodo) {
                return null;
            }
            const updatedTodo = Object.assign(Object.assign({}, existingTodo), updatedFields);
            this.todos.set(id, updatedTodo);
            return updatedTodo;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = this.todos.has(id);
            if (!exists) {
                return false;
            }
            this.todos.delete(id);
            return true;
        });
    }
}
exports.TodoRepository = TodoRepository;
