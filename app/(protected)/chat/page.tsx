'use client'

import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { ChatInput } from './components/ChatInput'
import { MessageList } from './components/MessageList'
import { Message, User } from './types'

// Mock current user
const currentUser: User = {
  id: '1',
  name: 'You',
  avatar: 'https://github.com/shadcn.png',
}

// Mock initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Hello everyone!',
    sender: {
      id: '2',
      name: 'Alice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
  },
  {
    id: '2',
    content: 'Hi Alice! How are you?',
    sender: currentUser,
    timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 mins ago
    isOwnMessage: true,
  },
  {
    id: '3',
    content: "I'm doing great, thanks for asking!",
    sender: {
      id: '2',
      name: 'Alice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 3), // 3 mins ago
  },
]

const Page = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: currentUser,
      timestamp: new Date(),
      isOwnMessage: true,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <Card className="flex h-full flex-col rounded-none overflow-hidden">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Chat Room</h1>
      </div>
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </Card>
  )
}

export default Page
