import { Request, Response } from 'express'
import { TodoPayload } from '../models/TodoPayload'
import { TodoService } from '../services/TodoService'

export class TodoController {
  constructor(private todoService: TodoService) {}

  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, dueDate, isCompleted, completionDate } = req.body
      const newTodo: TodoPayload = {
        name,
        dueDate,
        isCompleted,
        completionDate,
      }

      const createdTodo = await this.todoService.createTodo(newTodo)

      res.status(201).json(createdTodo)
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to create todo',
      })
    }
  }

  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await this.todoService.getAllTodos()

      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch todos',
      })
    }
  }

  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const { name, dueDate, isCompleted, completionDate } = req.body

      const updatedFields: TodoPayload = {
        name,
        dueDate,
        isCompleted,
        completionDate,
      }

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid or missing "id" parameter.' })
        return
      }

      const todoId = parseInt(id)
      const updatedTodo = await this.todoService.updateTodo(
        todoId,
        updatedFields
      )

      if (!updatedTodo) {
        res.status(404).json({ error: `Todo with id ${id} not found.` })
        return
      }

      res.status(200).json(updatedTodo)
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to update todo',
      })
    }
  }

  getTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid or missing "id" parameter.' })
        return
      }

      const todoId = parseInt(id)
      const todo = await this.todoService.getTodo(todoId)

      if (!todo) {
        res.status(404).json({ error: `Todo with id ${id} not found.` })
        return
      }

      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to fetch todo',
      })
    }
  }

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ error: 'Invalid or missing "id" parameter.' })
        return
      }

      const todoId = parseInt(id)
      const success = await this.todoService.deleteTodo(todoId)

      if (!success) {
        res.status(404).json({ error: `Todo with id ${id} not found.` })
        return
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Failed to delete todo',
      })
    }
  }
}
