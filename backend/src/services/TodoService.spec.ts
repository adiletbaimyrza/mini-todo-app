import assert from 'assert'
import { beforeEach, describe, it } from 'node:test'
import { TodoModel } from '../models/TodoModel'
import { TodoPayload } from '../models/TodoPayload'
import { TodoRepository } from '../repositories/TodoRepository'
import { TodoService } from './TodoService'

describe('TodoService', () => {
  let mockRepository: Partial<TodoRepository>
  let todoService: TodoService
  let initialTodos: TodoModel[]

  beforeEach(() => {
    initialTodos = [
      {
        id: 1,
        name: 'Initial Todo 1',
        dueDate: '2025-01-30',
        isCompleted: false,
        completionDate: null,
      },
      {
        id: 2,
        name: 'Initial Todo 2',
        dueDate: null,
        isCompleted: true,
        completionDate: '2025-01-20',
      },
    ]

    mockRepository = {
      create: async (todo: TodoPayload) => ({
        id: initialTodos.length + 1,
        ...todo,
      }),
      getById: async (id: number) =>
        initialTodos.find((todo) => todo.id === id) || null,
      getAll: async () => initialTodos,
      update: async (id: number, updatedFields: TodoPayload) => {
        const todo = initialTodos.find((t) => t.id === id)
        if (!todo) return null
        return { ...todo, ...updatedFields }
      },
      delete: async (id: number) => {
        const index = initialTodos.findIndex((todo) => todo.id === id)
        if (index === -1) return false
        initialTodos.splice(index, 1)
        return true
      },
    }

    todoService = new TodoService(mockRepository as TodoRepository)
  })

  it('should create a new todo', async () => {
    const payload: TodoPayload = {
      name: 'New Todo',
      isCompleted: false,
      dueDate: '2025-02-01',
      completionDate: null,
    }

    const todo = await todoService.createTodo(payload)

    assert.strictEqual(todo.name, 'New Todo')
    assert.strictEqual(todo.isCompleted, false)
    assert.strictEqual(todo.dueDate, '2025-02-01')
    assert.strictEqual(todo.completionDate, null)
    assert.strictEqual(todo.id, 3)
  })

  it('should get a todo by ID', async () => {
    const todo = await todoService.getTodo(1)

    assert.strictEqual(todo?.id, 1)
    assert.strictEqual(todo?.name, 'Initial Todo 1')
    assert.strictEqual(todo?.dueDate, '2025-01-30')
    assert.strictEqual(todo?.isCompleted, false)
  })

  it('should return null for non-existing ID in getTodo', async () => {
    const todo = await todoService.getTodo(999)

    assert.strictEqual(todo, null)
  })

  it('should return all todos', async () => {
    const todos = await todoService.getAllTodos()

    assert.strictEqual(todos.length, 2)
    assert.strictEqual(todos[0].name, 'Initial Todo 1')
    assert.strictEqual(todos[1].name, 'Initial Todo 2')
  })

  it('should update an existing todo', async () => {
    const updatedTodo = await todoService.updateTodo(1, {
      name: 'Updated Todo',
      isCompleted: true,
      dueDate: null,
      completionDate: '2025-02-05',
    })

    assert.strictEqual(updatedTodo?.name, 'Updated Todo')
    assert.strictEqual(updatedTodo?.isCompleted, true)
    assert.strictEqual(updatedTodo?.dueDate, null)
    assert.strictEqual(updatedTodo?.completionDate, '2025-02-05')
  })

  it('should return null when trying to update a non-existing todo', async () => {
    const result = await todoService.updateTodo(999, {
      name: 'Non-existing Todo',
      isCompleted: true,
      dueDate: null,
      completionDate: null,
    })

    assert.strictEqual(result, null)
  })

  it('should delete a todo by ID', async () => {
    const result = await todoService.deleteTodo(1)

    assert.strictEqual(result, true)

    const todos = await todoService.getAllTodos()

    assert.strictEqual(todos.length, 1)
    assert.strictEqual(todos[0].id, 2)
  })

  it('should return false when trying to delete a non-existing todo', async () => {
    const result = await todoService.deleteTodo(999)

    assert.strictEqual(result, false)
  })
})
