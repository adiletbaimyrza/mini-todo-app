import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  Input,
} from '@/components/ui'
import { useTodoForm } from '@/hooks/useTodoForm'
import { TodoModel } from '../../../backend/src/models/TodoModel'
import { TodoPayload } from '../../../backend/src/models/TodoPayload'
import { CalendarPopover } from './CalendarPopover'

const TodoForm = ({ todo, onSubmit, onCancel }: TodoFormProps) => {
  const {
    name,
    completed,
    dueDate,
    completionDate,
    error,
    handleNameChange,
    handleCompletedChange,
    handleDueDateSelect,
    handleCompletionDateSelect,
    submitTodoForm,
    onCancel: cancelHandler,
  } = useTodoForm(todo, onSubmit, onCancel)

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Name:</label>
        <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Todo name"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Due date:</label>
        <CalendarPopover
          label="Pick a date"
          selectedDate={dueDate}
          onDateSelect={handleDueDateSelect}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox checked={completed} onCheckedChange={handleCompletedChange} />
        <label className="text-sm font-medium">Completed</label>
      </div>

      {completed && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Completion date:</label>
          <CalendarPopover
            label="Pick a date"
            selectedDate={completionDate}
            onDateSelect={handleCompletionDateSelect}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button onClick={submitTodoForm}>Save</Button>
      </div>
    </div>
  )
}

export { TodoForm }

type TodoFormProps = {
  todo: TodoModel | null
  onSubmit: (todo: TodoModel | TodoPayload) => Promise<void>
  onCancel: () => void
}
