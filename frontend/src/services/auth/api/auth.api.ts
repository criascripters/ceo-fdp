import { AxiosInstance } from 'axios'
import IAuthGateway, {
  IAuthGatewayValidateCookieCodeRequest,
  IAuthGatewayValidateCookieCodeResponse,
} from '../IAuthGateway'

interface IProps {
  api: AxiosInstance
}

export default class AuthApiService implements IAuthGateway {
  private readonly props: IProps

  constructor(props: IProps) {
    this.props = props
  }

  async validateCookieCode(
    request: IAuthGatewayValidateCookieCodeRequest
  ): Promise<IAuthGatewayValidateCookieCodeResponse> {
    await this.props.api.post('/auth/discord', request)

    return undefined
  }
}
