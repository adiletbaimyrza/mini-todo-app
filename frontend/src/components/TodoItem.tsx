import { Pen, Trash2 } from 'lucide-react'
import { memo, useCallback } from 'react'
import { TodoDetails } from './TodoDetails'
import { Button, Checkbox } from './ui'

import { TodoModel } from '../../../backend/src/models/TodoModel'

const TodoItem = memo(
  ({ todo, onToggleComplete, onEdit, onDelete }: TodoItemProps) => {
    const { id, name, isCompleted, dueDate, completionDate } = todo
    const todoClass = isCompleted ? 'line-through text-gray-500' : ''

    const handleToggleComplete = useCallback(() => {
      onToggleComplete(id)
    }, [id, onToggleComplete])

    const handleEdit = useCallback(() => {
      onEdit(todo)
    }, [todo, onEdit])

    const handleDelete = useCallback(() => {
      onDelete(id)
    }, [id, onDelete])

    return (
      <div className="flex items-center space-x-2 p-2 border rounded">
        <Checkbox
          className="mr-2"
          checked={isCompleted}
          onCheckedChange={handleToggleComplete}
        />
        <div className="flex-1">
          <div className={`font-medium ${todoClass}`}>{name}</div>
          <TodoDetails dueDate={dueDate} completionDate={completionDate} />
        </div>
        <Button variant="ghost" size="icon" onClick={handleEdit}>
          <Pen />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }
)

export { TodoItem }

type TodoItemProps = {
  todo: TodoModel
  onToggleComplete: (id: number) => void
  onEdit: (todo: TodoModel) => void
  onDelete: (id: number) => void
}
