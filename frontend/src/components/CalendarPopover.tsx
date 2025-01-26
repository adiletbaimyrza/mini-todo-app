import { formatDateToReadable } from '@/utils/formatDateToReadable'
import { CalendarIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from './ui'

const CalendarPopover = ({
  label,
  selectedDate,
  onDateSelect,
}: CalendarPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  const handleDateSelect = useCallback(
    (day: Date | undefined) => {
      onDateSelect(day)
      setIsPopoverOpen(false)
    },
    [onDateSelect]
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? formatDateToReadable(selectedDate) : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { CalendarPopover }

type CalendarPopoverProps = {
  label: string
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
}
