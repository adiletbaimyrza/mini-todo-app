import { Router } from 'express'
import { TodoController } from '../controllers/TodoController'
import { validateTodoPayload } from '../middlewares/validateTodoPayload'

export const createTodoRoutes = (todoController: TodoController): Router => {
  const router = Router()

  router.get('/', todoController.getAllTodos)
  router.get('/:id', todoController.getTodo)
  router.post('/', validateTodoPayload, todoController.createTodo)
  router.patch('/:id', validateTodoPayload, todoController.updateTodo)
  router.delete('/:id', todoController.deleteTodo)

  return router
}
