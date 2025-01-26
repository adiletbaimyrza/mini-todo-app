import { getAdjustedDateByTimezone } from '@/utils/adjustDateToTimezone'
import { formatDateToYYYYMMDD } from '@/utils/formatDateToYYYYMMDD'
import { useCallback, useState } from 'react'

import { TodoModel } from '../../../backend/src/models/TodoModel'
import { TodoPayload } from '../../../backend/src/models/TodoPayload'

const useTodoForm = (
  todo: TodoModel | null,
  onSubmit: (todo: TodoModel | TodoPayload) => Promise<void>,
  onCancel: () => void
) => {
  const mode = todo ? FormMode.Edit : FormMode.Add

  const [name, setName] = useState(todo?.name || '')
  const [completed, setCompleted] = useState(todo?.isCompleted || false)
  const [dueDate, setDueDate] = useState(
    todo?.dueDate ? new Date(todo.dueDate) : undefined
  )
  const [completionDate, setCompletionDate] = useState(
    todo?.completionDate ? new Date(todo.completionDate) : undefined
  )
  const [error, setError] = useState<string | null>(null)

  const submitTodoForm = useCallback(() => {
    if (!name.trim()) {
      setError('Todo name is required')
      return
    }

    if (completed && completionDate) {
      const today = new Date()
      if (completionDate > today) {
        setError('Completion date cannot be in the future')
        return
      }
    }

    const payload: TodoPayload = {
      name,
      dueDate: dueDate ? getAdjustedDateByTimezone(dueDate) : null,
      isCompleted: completed,
      completionDate: completed
        ? completionDate
          ? getAdjustedDateByTimezone(completionDate)
          : formatDateToYYYYMMDD(new Date())
        : null,
    }

    const fullPayload =
      mode === FormMode.Edit ? { ...payload, id: todo!.id } : payload

    onSubmit(fullPayload)
  }, [name, completed, dueDate, completionDate, mode, todo, onSubmit])

  const handleCompletedChange = useCallback(
    (checked: boolean) => {
      setCompleted(checked)
      if (checked && !completionDate) {
        setCompletionDate(new Date())
      } else if (!checked) {
        setCompletionDate(undefined)
      }
    },
    [completionDate]
  )

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    },
    []
  )

  const handleDueDateSelect = useCallback((day: Date | undefined) => {
    setDueDate(day)
  }, [])

  const handleCompletionDateSelect = useCallback((day: Date | undefined) => {
    const today = new Date()

    setCompletionDate(day)

    if (day && day > today) {
      setError('Completion date cannot be in the future')
    } else {
      setError(null)
    }
  }, [])

  return {
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
    onCancel,
  }
}

export { useTodoForm }

enum FormMode {
  Add,
  Edit,
}
