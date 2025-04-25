export interface IAuthGatewayValidateCookieCodeRequest {
  code?: string
}

export interface IAuthGatewayValidateCookieCodeResponse {
  isAdmin: boolean
}

export default interface IAuthGateway {
  /**
   * Validates if the cookie code is valid
   */
  validateCookieCode(request: IAuthGatewayValidateCookieCodeRequest): Promise<IAuthGatewayValidateCookieCodeResponse>
}
