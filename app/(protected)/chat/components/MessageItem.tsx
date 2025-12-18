import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Message } from '../types'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isOwn = message.isOwnMessage

  return (
    <div
      className={cn(
        'flex w-full gap-2 p-2',
        isOwn ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
        <AvatarFallback>
          {message.sender.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex max-w-[70%] flex-col gap-1',
          isOwn ? 'items-end' : 'items-start',
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {message.sender.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div
          className={cn(
            'rounded-lg px-3 py-2 text-sm',
            isOwn
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground',
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}
