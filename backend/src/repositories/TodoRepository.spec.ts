import assert from 'assert'
import { beforeEach, describe, it } from 'node:test'
import { TodoModel } from '../models/TodoModel'
import { TodoPayload } from '../models/TodoPayload'
import { TodoRepository } from './TodoRepository'

describe('TodoRepository', () => {
  let repo: TodoRepository
  let initialTodos: TodoModel[] | undefined

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
    repo = new TodoRepository(initialTodos)
  })

  it('should create a new todo', async () => {
    const payload: TodoPayload = {
      name: 'New Todo',
      dueDate: '2025-02-01',
      isCompleted: false,
      completionDate: null,
    }

    const todo = await repo.create(payload)

    assert.strictEqual(todo.name, 'New Todo')
    assert.strictEqual(todo.dueDate, '2025-02-01')
    assert.strictEqual(todo.isCompleted, false)
    assert.strictEqual(todo.completionDate, null)
    assert.strictEqual(todo.id, 3)
  })

  it('should return all todos', async () => {
    const todos = await repo.getAll()

    assert.strictEqual(todos.length, 2)
    assert.strictEqual(todos[0].name, 'Initial Todo 1')
    assert.strictEqual(todos[1].name, 'Initial Todo 2')
    assert.strictEqual(todos[1].isCompleted, true)
  })

  it('should get a todo by ID', async () => {
    const todo = await repo.getById(1)

    assert.strictEqual(todo?.id, 1)
    assert.strictEqual(todo?.name, 'Initial Todo 1')
    assert.strictEqual(todo?.dueDate, '2025-01-30')
    assert.strictEqual(todo?.isCompleted, false)
  })

  it('should return null for non-existing ID in getById', async () => {
    const todo = await repo.getById(999)

    assert.strictEqual(todo, null)
  })

  it('should update an existing todo', async () => {
    const updatedTodo = await repo.update(1, {
      name: 'Updated Todo',
      dueDate: null,
      isCompleted: true,
      completionDate: '2025-02-02',
    })

    assert.strictEqual(updatedTodo?.name, 'Updated Todo')
    assert.strictEqual(updatedTodo?.dueDate, null)
    assert.strictEqual(updatedTodo?.isCompleted, true)
    assert.strictEqual(updatedTodo?.completionDate, '2025-02-02')
  })

  it('should return null when trying to update a non-existing todo', async () => {
    const result = await repo.update(999, {
      name: 'Non-existing Todo',
      dueDate: null,
      isCompleted: true,
      completionDate: null,
    })

    assert.strictEqual(result, null)
  })

  it('should delete a todo by ID', async () => {
    const result = await repo.delete(1)

    assert.strictEqual(result, true)

    const todos = await repo.getAll()

    assert.strictEqual(todos.length, 1)
    assert.strictEqual(todos[0].id, 2)
  })

  it('should return false when trying to delete a non-existing todo', async () => {
    const result = await repo.delete(999)

    assert.strictEqual(result, false)
  })
})
