import { IMessage } from '@/@types/message'
import { AxiosInstance } from 'axios'
import IMessagesGateway, {
  IMessagesGatewayAddMessageRequest,
  IMessagesGatewayAddMessageResponse,
  IMessagesGatewayDeleteMessageRequest,
  IMessagesGatewayDeleteMessageResponse,
  IMessagesGatewayGetLastMessageResponse,
  IMessagesGatewayListMessagesRequest,
  IMessagesGatewayListMessagesResponse,
} from '../IMessagesGateway'

interface IRawMessage {
  _id: string
  name: string
  message: string
  createdAt: string
}

interface IMessagesApiServiceProps {
  api: AxiosInstance
}

export default class MessagesApiService implements IMessagesGateway {
  props: IMessagesApiServiceProps

  constructor(props: IMessagesApiServiceProps) {
    this.props = props
  }

  public async addMessage(request: IMessagesGatewayAddMessageRequest): Promise<IMessagesGatewayAddMessageResponse> {
    return this.props.api.post<IRawMessage>('/api/addMessage', request).then((response) => {
      return { message: this.parseRawMessage(response.data) }
    })
  }

  public async listMessages(
    request: IMessagesGatewayListMessagesRequest = {}
  ): Promise<IMessagesGatewayListMessagesResponse> {
    const { page = 1, perPage = 10 } = request

    return this.props.api
      .get<IRawMessage[]>('/api/messages', { params: { page, perPage } })
      .then((response) => ({ messages: response.data.map(this.parseRawMessage.bind(this)) }))
  }

  public async getLastMessage(): Promise<IMessagesGatewayGetLastMessageResponse> {
    return this.props.api
      .get<IRawMessage>('/api/getLastMessage')
      .then((response) => ({ message: this.parseRawMessage(response.data) }))
  }

  public async deleteMessage(
    request: IMessagesGatewayDeleteMessageRequest
  ): Promise<IMessagesGatewayDeleteMessageResponse> {
    const { messageId } = request

    return this.props.api.delete<null>(`/admin/messages/${messageId}`).then(() => undefined)
  }

  private parseRawMessage(message: IRawMessage): IMessage {
    return {
      id: message._id,
      name: message.name,
      message: message.message,
      createdAt: new Date(message.createdAt),
    }
  }
}
