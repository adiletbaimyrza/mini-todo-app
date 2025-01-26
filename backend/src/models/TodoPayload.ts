import { TodoModel } from './TodoModel'

export type TodoPayload = Omit<TodoModel, 'id'> & {
  dueDate?: string | null
  completionDate?: string | null
}
