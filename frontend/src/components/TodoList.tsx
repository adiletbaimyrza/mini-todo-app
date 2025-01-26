import { memo } from 'react'
import { TodoItem } from './TodoItem'

import { TodoModel } from '../../../backend/src/models/TodoModel'

const TodoList = memo(
  ({ todos, onToggleComplete, onEdit, onDelete }: TodoListProps) => (
    <div className="space-y-2">
      {todos.map((todo: TodoModel) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
)

export { TodoList }

type TodoListProps = {
  todos: TodoModel[]
  onToggleComplete: (id: number) => Promise<void>
  onEdit: (todo: TodoModel) => void
  onDelete: (id: number) => Promise<void>
}
