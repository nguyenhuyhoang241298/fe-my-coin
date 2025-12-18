import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useRef } from 'react'
import { Message } from '../types'
import { MessageItem } from './MessageItem'

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(100dvh-300px)] p-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  )
}
