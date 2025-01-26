import { formatDateToYYYYMMDD } from '@/utils/formatDateToYYYYMMDD'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TodosApiClientService } from '../services/TodosApiClientService'

import { TodoModel } from '../../../backend/src/models/TodoModel'
import { TodoPayload } from '../../../backend/src/models/TodoPayload'

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoModel[]>([])
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const [editingTodo, setEditingTodo] = useState<TodoModel | null>(null)
  const [error, setError] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const fetchUncompletedTodos = async () => {
    try {
      const data: TodoModel[] = await TodosApiClientService.getAllTodos()
      setTodos(data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch todos')
    }
  }

  useEffect(() => {
    fetchUncompletedTodos()
  }, [])

  const handleAddTodo = useCallback(async (newTodo: TodoPayload) => {
    if (!newTodo.name.trim()) {
      setError('Todo name is required')
      return
    }

    try {
      const createdTodo = await TodosApiClientService.createTodo(newTodo)

      setTodos((prev) => [
        ...prev,
        {
          ...createdTodo,
          completionDate: createdTodo.isCompleted
            ? createdTodo.completionDate || formatDateToYYYYMMDD(new Date())
            : null,
        },
      ])

      setIsDialogOpen(false)
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to create todo')
    }
  }, [])

  const handleEditTodo = useCallback(async (todo: TodoModel) => {
    if (!todo.name.trim()) {
      setError('Todo name is required')
      return
    }

    try {
      const updatedTodo = await TodosApiClientService.updateTodo(todo.id, {
        name: todo.name,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted,
        completionDate: todo.isCompleted
          ? todo.completionDate || formatDateToYYYYMMDD(new Date())
          : null,
      })

      setTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      )

      setEditingTodo(null)
      setIsDialogOpen(false)
      setError('')
    } catch (err) {
      console.error(err)
      setError('Failed to update todo')
    }
  }, [])

  const handleDeleteTodo = useCallback(async (id: number) => {
    try {
      await TodosApiClientService.deleteTodo(id)
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    } catch (err) {
      console.error(err)
      setError('Failed to delete todo')
    }
  }, [])

  const handleToggleComplete = useCallback(
    async (id: number) => {
      try {
        const todo = todos.find((todo) => todo.id === id)
        if (!todo) return

        const updatedTodo = {
          ...todo,
          isCompleted: !todo.isCompleted,
          completionDate: !todo.isCompleted
            ? formatDateToYYYYMMDD(new Date())
            : null,
        }

        const response = await TodosApiClientService.updateTodo(id, {
          name: updatedTodo.name,
          dueDate: updatedTodo.dueDate,
          isCompleted: updatedTodo.isCompleted,
          completionDate: updatedTodo.completionDate,
        })

        setTodos((prev) =>
          prev.map((todo) => (todo.id === response.id ? response : todo))
        )
      } catch (err) {
        console.error(err)
        setError('Failed to toggle todo completion')
      }
    },
    [todos]
  )

  const filteredTodos = useMemo(() => {
    return todos
      .sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
          return a.id - b.id
        }
        return a.isCompleted ? 1 : -1
      })
      .filter((todo) => showCompleted || !todo.isCompleted)
  }, [todos, showCompleted])

  const handleShowCompletedChange = useCallback((checked: boolean) => {
    setShowCompleted(checked)
  }, [])

  const handleSubmitTodo = useCallback(
    async (todo: TodoModel | TodoPayload) => {
      if (editingTodo) {
        await handleEditTodo(todo as TodoModel)
      } else {
        await handleAddTodo(todo as TodoPayload)
      }
    },
    [editingTodo, handleAddTodo, handleEditTodo]
  )

  return {
    todos: filteredTodos,
    error,
    editingTodo,
    showCompleted,
    isDialogOpen,
    setIsDialogOpen,
    handleSubmitTodo,
    handleDeleteTodo,
    handleToggleComplete,
    handleShowCompletedChange,
    setEditingTodo,
    setError,
  }
}
