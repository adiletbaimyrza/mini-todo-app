import express from 'express'
import path from 'path'
import { TodoController } from './controllers/TodoController'
import initialTodos from './data/initialTodos'
import { TodoRepository } from './repositories/TodoRepository'
import { createTodoRoutes } from './routes/todoRoutes'
import { TodoService } from './services/TodoService'

const app = express()
const port = 3000

app.use(express.json())

const todoRepository = new TodoRepository(initialTodos)
const todoService = new TodoService(todoRepository)
const todoController = new TodoController(todoService)

app.use('/', express.static(path.join(__dirname, '../../frontend/dist')))
app.use('/api/todos', createTodoRoutes(todoController))

app.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${port}`)
})
