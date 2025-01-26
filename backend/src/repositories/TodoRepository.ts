import { TodoModel } from '../models/TodoModel'
import { TodoPayload } from '../models/TodoPayload'

export class TodoRepository {
  private todos: Map<number, TodoModel> = new Map()
  private currentId: number = 1

  constructor(private initialTodos?: TodoModel[]) {
    if (this.initialTodos) {
      this.initialTodos.forEach((todo) => {
        this.todos.set(todo.id, todo)
        if (todo.id >= this.currentId) {
          this.currentId = todo.id + 1
        }
      })
    }
  }

  async create(todo: TodoPayload): Promise<TodoModel> {
    const newTodo: TodoModel = { id: this.currentId, ...todo }

    this.todos.set(newTodo.id, newTodo)

    this.currentId++

    return newTodo
  }

  async getAll(): Promise<TodoModel[]> {
    return Array.from(this.todos.values())
  }

  async getById(id: number): Promise<TodoModel | null> {
    return this.todos.get(id) || null
  }

  async update(
    id: number,
    updatedFields: TodoPayload
  ): Promise<TodoModel | null> {
    const existingTodo = await this.getById(id)

    if (!existingTodo) {
      return null
    }

    const updatedTodo: TodoModel = { ...existingTodo, ...updatedFields }
    this.todos.set(id, updatedTodo)
    return updatedTodo
  }

  async delete(id: number): Promise<boolean> {
    const exists = this.todos.has(id)

    if (!exists) {
      return false
    }

    this.todos.delete(id)
    return true
  }
}
