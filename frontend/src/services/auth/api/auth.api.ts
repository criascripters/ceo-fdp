import { AxiosInstance } from 'axios'
import IAuthGateway, {
  IAuthGatewayValidateCookieCodeRequest,
  IAuthGatewayValidateCookieCodeResponse,
} from '../IAuthGateway'

interface IProps {
  api: AxiosInstance
}

interface IValidateCookieCodeApiResponse {
  isAdmin: boolean
}

export default class AuthApiService implements IAuthGateway {
  private readonly props: IProps

  constructor(props: IProps) {
    this.props = props
  }

  async validateCookieCode(
    request: IAuthGatewayValidateCookieCodeRequest
  ): Promise<IAuthGatewayValidateCookieCodeResponse> {
    return await this.props.api.post<IValidateCookieCodeApiResponse>('/auth/discord', request).then((res) => res.data)
  }
}
