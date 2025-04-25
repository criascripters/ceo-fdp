import { IMessage } from '@/@types/message'

export interface IMessagesGatewayAddMessageRequest {
  name: string
  message: string
}

export interface IMessagesGatewayAddMessageResponse {
  message: IMessage
}

export interface IMessagesGatewayListMessagesRequest {
  page?: number
  perPage?: number
}

export interface IMessagesGatewayListMessagesResponse {
  messages: IMessage[]
}

export interface IMessagesGatewayGetLastMessageResponse {
  message: IMessage
}

export interface IMessagesGatewayDeleteMessageRequest {
  messageId: string
}

export type IMessagesGatewayDeleteMessageResponse = undefined

export default interface IMessagesGateway {
  /**
   * Sends a new message to the queue.
   */
  addMessage(message: IMessagesGatewayAddMessageRequest): Promise<IMessagesGatewayAddMessageResponse>

  /**
   * Lists the last messages sent by all users.
   */
  listMessages(request?: IMessagesGatewayListMessagesRequest): Promise<IMessagesGatewayListMessagesResponse>

  /**
   * Gets the last message sent.
   */
  getLastMessage(): Promise<IMessagesGatewayGetLastMessageResponse>

  /**
   * Deletes a message by its ID.
   */
  deleteMessage(request: IMessagesGatewayDeleteMessageRequest): Promise<IMessagesGatewayDeleteMessageResponse>
}
