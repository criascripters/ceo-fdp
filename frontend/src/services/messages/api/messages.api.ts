import { AxiosInstance } from "axios";
import IMessagesGateway, {
  IMessagesGatewayAddMessageRequest,
  IMessagesGatewayGetLastMessageResponse,
  IMessagesGatewayListMessagesRequest,
  IMessagesGatewayListMessagesResponse
} from "../IMessagesGateway";

interface IMessagesApiServiceProps {
  api: AxiosInstance;
}

export default class MessagesApiService implements IMessagesGateway {
  props: IMessagesApiServiceProps;

  constructor(props: IMessagesApiServiceProps) {
    this.props = props;
  }

  public async addMessage(request: IMessagesGatewayAddMessageRequest): Promise<void> {
    return this.props.api
      .post("/addMessage", request)
      .then((response) => response.data);
  }

  public async listMessages(request: IMessagesGatewayListMessagesRequest = {}): Promise<IMessagesGatewayListMessagesResponse> {
    const { page = 1, perPage = 10 } = request

    return this.props.api
      .get("/db", { params: { page, perPage } })
      .then((response) => ({ messages: response.data }));
  }

  public async getLastMessage(): Promise<IMessagesGatewayGetLastMessageResponse> {
    return this.props.api
      .get("/getLastMessage")
      .then((response) => response.data);
  }
}
