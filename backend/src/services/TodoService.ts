import { TodoModel } from '../models/TodoModel'
import { TodoPayload } from '../models/TodoPayload'
import { TodoRepository } from '../repositories/TodoRepository'

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(todo: TodoPayload): Promise<TodoModel> {
    const newTodo: TodoPayload = {
      name: todo.name,
      isCompleted: todo.isCompleted,
      dueDate: todo.dueDate ?? null,
      completionDate: todo.completionDate ?? null,
    }

    return this.todoRepository.create(newTodo)
  }

  async getTodo(id: number): Promise<TodoModel | null> {
    return this.todoRepository.getById(id)
  }

  async getAllTodos(): Promise<TodoModel[]> {
    return this.todoRepository.getAll()
  }

  async updateTodo(
    id: number,
    updatedFields: TodoPayload
  ): Promise<TodoModel | null> {
    const existingTodo = await this.todoRepository.getById(id)

    if (!existingTodo) {
      return null
    }

    const fieldsToUpdate: TodoPayload = {
      name: updatedFields.name,
      isCompleted: updatedFields.isCompleted,
      dueDate: updatedFields.dueDate ?? null,
      completionDate: updatedFields.completionDate ?? null,
    }

    return this.todoRepository.update(id, fieldsToUpdate)
  }

  async deleteTodo(id: number): Promise<boolean> {
    const existingTodo = await this.todoRepository.getById(id)

    if (!existingTodo) {
      return false
    }

    return this.todoRepository.delete(id)
  }
}
