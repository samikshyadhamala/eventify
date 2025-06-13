'use client'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell } from '@/components/ui/table'
import { motion } from 'framer-motion'
import { useEvents } from '../../context'

interface EventRowProps {
  index: number
}

const getEventStatus = (eventDate: string) => {
  const now = new Date()
  const date = new Date(eventDate)
  const endDate = new Date(date)
  endDate.setHours(endDate.getHours() + 24)

  if (date > now) {
    return 'Upcoming'
  } else if (now >= date && now <= endDate) {
    return 'Ongoing'
  } else {
    return 'Past'
  }
}

export default function EventRow({ index }: EventRowProps) {
  const { 
    events,
    eventRegistrations,
    handleDelete,
    handleEventDetails,
    handleEditEvent,
    setIsDeleteDialogOpen,
    setSelectedEventId
  } = useEvents();
  
  const event = events[index];
  const status = getEventStatus(event.event_date)
  const registrationCount = eventRegistrations?.[event.event_id] || 0

  const handleDeleteButtonClick = () => {
    setIsDeleteDialogOpen(true)
    setSelectedEventId(event.event_id)
  }
  return (
    <motion.tr
      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: {delay: index * 0.1 }}}
    >
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`
            ${status === 'Upcoming' ? 'border-blue-200 bg-blue-50 text-blue-700' : status === 'Past' ? 'border-green-200 bg-green-50 text-green-700' : 'border-yellow-200 bg-yellow-50 text-yellow-700'}
          `}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span>
              {registrationCount}/{event.max_capacity}
            </span>
            <span className="text-muted-foreground">{Math.round((registrationCount / event.max_capacity) * 100)}%</span>
          </div>
          <Progress value={(registrationCount / event.max_capacity) * 100} className="h-1" />
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${event.is_paid ? 'border-purple-200 bg-purple-50 text-purple-700' : 'border-gray-200 bg-gray-50 text-gray-700'}`}
        >
          {event.is_paid ? 'Paid' : 'Free'}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEventDetails(event)}>Event Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditEvent(event)}>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={handleDeleteButtonClick}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </motion.tr>
  )
}