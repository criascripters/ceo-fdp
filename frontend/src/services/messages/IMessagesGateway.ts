import { IMessage } from "@/@types/message"

export interface IMessagesGatewaySendMessageRequest {
    name: string
    message: string
}

export interface IMessagesGatewayListLastMessagesRequest {
    page?: number
    perPage?: number
}

export interface IMessagesGatewayListLastMessagesResponse {
    messages: IMessage[]
}

export default interface IMessagesGateway {
    /**
     * Envia uma nova mensagem para a fila.
     */
    sendMessage(message: IMessagesGatewaySendMessageRequest): Promise<void>

    /**
     * Lista as últimas mensagens enviadas por todos os usuários.
     */
    listLastMessages(request: IMessagesGatewayListLastMessagesRequest): Promise<IMessagesGatewayListLastMessagesResponse>
}
