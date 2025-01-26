import { TodoModel } from '../../../backend/src/models/TodoModel'
import { TodoPayload } from '../../../backend/src/models/TodoPayload'

export class TodosApiClientService {
  private static baseURL: string

  static setBaseURL(baseURL: string) {
    TodosApiClientService.baseURL = baseURL
  }

  private static async request<T>(
    url: string,
    method: string,
    body?: unknown
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
    }

    const response = await fetch(`${TodosApiClientService.baseURL}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`Request failed: ${errorMessage}`)
    }

    return response.json()
  }

  static async createTodo(todo: TodoPayload): Promise<TodoModel> {
    try {
      return await TodosApiClientService.request<TodoModel>(
        '/todos',
        'POST',
        todo
      )
    } catch (error) {
      throw new Error(
        `Failed to create todo: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  static async getAllTodos(): Promise<TodoModel[]> {
    try {
      return await TodosApiClientService.request<TodoModel[]>(`/todos`, 'GET')
    } catch (error) {
      throw new Error(
        `Failed to fetch todos: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  static async getTodoById(id: number): Promise<TodoModel> {
    try {
      return await TodosApiClientService.request<TodoModel>(
        `/todos/${id}`,
        'GET'
      )
    } catch (error) {
      throw new Error(
        `Failed to fetch todo with ID ${id}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  static async updateTodo(
    id: number,
    updatedTodo: TodoPayload
  ): Promise<TodoModel> {
    try {
      return await TodosApiClientService.request<TodoModel>(
        `/todos/${id}`,
        'PATCH',
        updatedTodo
      )
    } catch (error) {
      throw new Error(
        `Failed to update todo with ID ${id}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  static async deleteTodo(id: number): Promise<void> {
    try {
      const response = await fetch(
        `${TodosApiClientService.baseURL}/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`Request failed: ${errorMessage}`)
      }
    } catch (error) {
      throw new Error(
        `Failed to delete todo with ID ${id}: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }
}
