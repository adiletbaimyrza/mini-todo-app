import { formatDateToReadable } from '@/utils/formatDateToReadable'
import { memo } from 'react'

const TodoDetails = memo(
  ({
    dueDate,
    completionDate,
  }: {
    dueDate: string | null
    completionDate: string | null
  }) => (
    <>
      {dueDate && (
        <div className="text-sm text-gray-500">
          Due: {formatDateToReadable(dueDate)}
        </div>
      )}
      {completionDate && (
        <div className="text-sm text-gray-500">
          Completed: {formatDateToReadable(completionDate)}
        </div>
      )}
    </>
  )
)

export { TodoDetails }
