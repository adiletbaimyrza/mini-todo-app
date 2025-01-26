import { TodoModel } from './TodoModel'

export interface ValidationError {
  field: keyof TodoModel
  message: string
}
