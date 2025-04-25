import { IMessage } from '@/@types/message'
import { useLogin } from '@/contexts/LoginProvider'
import { useMessagesDispatch } from '@/contexts/MessagesProvider'
import { useService } from '@/contexts/ServiceProvider'
import { formatDate } from '@/utils/format-date'
import { useCallback } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'sonner'

interface IMessageProps {
  message: IMessage
  index: number
}

export default function Message({ message, index }: Readonly<IMessageProps>) {
  // #region Contexts
  const { isAdmin } = useLogin()
  const { messagesService } = useService()
  const messagesDispatch = useMessagesDispatch()
  // #endregion

  // #region Callbacks
  const handleDeleteMessage = useCallback(() => {
    messagesService
      .deleteMessage({ messageId: message.id })
      .then(() => {
        messagesDispatch({ type: 'delete-message', messageId: message.id })
        toast.success('Mensagem removida com sucesso')
      })
      .catch(() => {
        toast.error('Não foi possível remover a mensagem')
      })
  }, [messagesService, message.id, messagesDispatch])
  // #endregion

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
      <div className="flex gap-1 justify-between">
        <span className="text-sm">{message.message}</span>
        {isAdmin && (
          <button
            onClick={handleDeleteMessage}
            className={`cursor-pointer border-1 transition-[color] p-1 rounded-sm
              text-red-500 border-transparent
              hover:border-gray-400
              active:bg-gray-300
            `}
          >
            <FaTrashAlt />
          </button>
        )}
      </div>
    </div>
  )
}
