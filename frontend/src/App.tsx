import { Plus } from 'lucide-react'
import { TodoModel } from '../../backend/src/models/TodoModel'
import { TodoDialog } from './components/TodoDialog'
import { TodoList } from './components/TodoList'
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Switch,
} from './components/ui'
import { useTodos } from './hooks/useTodos'
const App = () => {
  const {
    todos,
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
  } = useTodos()

  const handleCancelDialog = () => {
    setIsDialogOpen(false)
    setEditingTodo(null)
  }

  const handleOpenAddDialog = () => {
    setEditingTodo(null)
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (todo: TodoModel) => {
    setEditingTodo(todo)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto my-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Todo List</CardTitle>
            <Button onClick={handleOpenAddDialog} className="ml-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Todo
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showCompleted}
              onCheckedChange={handleShowCompletedChange}
            />
            <span className="text-sm">Show completed items</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onEdit={handleOpenEditDialog}
            onDelete={handleDeleteTodo}
          />
        </CardContent>
      </Card>

      <TodoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingTodo={editingTodo}
        error={error}
        onSubmit={handleSubmitTodo}
        onCancel={handleCancelDialog}
      />
    </>
  )
}

export default App
