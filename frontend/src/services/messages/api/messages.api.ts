import { AxiosInstance } from "axios";
import IMessagesGateway, {
  IMessagesGatewayListLastMessagesRequest,
  IMessagesGatewayListLastMessagesResponse,
  IMessagesGatewaySendMessageRequest,
} from "../IMessagesGateway";

interface IMessagesApiServiceProps {
  api: AxiosInstance;
}

export default class MessagesApiService implements IMessagesGateway {
  props: IMessagesApiServiceProps;

  constructor(props: IMessagesApiServiceProps) {
    this.props = props;
  }

  public async listLastMessages(
    _request: IMessagesGatewayListLastMessagesRequest
  ): Promise<IMessagesGatewayListLastMessagesResponse> {
    throw new Error("Method not implemented.");
  }

  public async sendMessage(_message: IMessagesGatewaySendMessageRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
