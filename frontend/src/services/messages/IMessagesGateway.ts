import { IMessage } from "@/@types/message"

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

export default interface IMessagesGateway {
    /**
     * Envia uma nova mensagem para a fila.
     */
    addMessage(message: IMessagesGatewayAddMessageRequest): Promise<IMessagesGatewayAddMessageResponse>

    /**
     * Lista as últimas mensagens enviadas por todos os usuários.
     */
    listMessages(request?: IMessagesGatewayListMessagesRequest): Promise<IMessagesGatewayListMessagesResponse>

    /**
     * Obtém a última mensagem enviada.
     */
    getLastMessage(): Promise<IMessagesGatewayGetLastMessageResponse>
}
