import React, { memo } from 'react'
import { TodoForm } from './TodoForm'
import {
  Alert,
  AlertDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui'

import { TodoModel } from '../../../backend/src/models/TodoModel'
import { TodoPayload } from '../../../backend/src/models/TodoPayload'

const TodoDialog = memo(
  ({
    isOpen,
    onOpenChange,
    editingTodo,
    error,
    onSubmit,
    onCancel,
  }: TodoDialogProps) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </DialogTitle>
        </DialogHeader>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <TodoForm todo={editingTodo} onSubmit={onSubmit} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  )
)

export { TodoDialog }

type TodoDialogProps = {
  isOpen: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  editingTodo: TodoModel | null
  error: string
  onSubmit: (todo: TodoModel | TodoPayload) => Promise<void>
  onCancel: () => void
}
