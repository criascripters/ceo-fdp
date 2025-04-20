import { IMessage } from '@/@types/message'
import { formatDate } from '@/utils/format-date'

interface IMessageProps {
  message: IMessage
  index: number
}

export default function Message({ message, index }: Readonly<IMessageProps>) {
  return (
    <div
      className={`flex flex-col gap-2 pt-1
        ${index !== 0 ? 'border-t-1 border-t-gray-200' : ''}
      `}
      key={message.id}
    >
      <div className="flex gap-1 justify-between">
        <span className="font-semibold text-md">{message.name}</span>
        <span className="text-xs">{formatDate(message.createdAt)}</span>
      </div>
      <span className="text-sm">{message.message}</span>
    </div>
  )
}
