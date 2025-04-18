export interface IAuthGatewayValidateCookieCodeRequest {
  code?: string
}

export type IAuthGatewayValidateCookieCodeResponse = undefined

export default interface IAuthGateway {
  /**
   * Validates if the cookie code is valid
   */
  validateCookieCode(request: IAuthGatewayValidateCookieCodeRequest): Promise<IAuthGatewayValidateCookieCodeResponse>
}
