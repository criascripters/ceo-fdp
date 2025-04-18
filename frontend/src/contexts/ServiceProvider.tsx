import AuthApiService from '@/services/auth/api/auth.api'
import IAuthGateway from '@/services/auth/IAuthGateway'
import MessagesApiService from '@/services/messages/api/messages.api'
import IMessagesGateway from '@/services/messages/IMessagesGateway'
import { settings } from '@/utils/settings'
import axios from 'axios'
import { createContext, useContext, useMemo } from 'react'

// #region Type definitions
interface ServiceProviderProps {
  children: React.ReactNode
}

interface ServiceContextState {
  messagesService: IMessagesGateway
  authService: IAuthGateway
}
// #endregion

// #region Context definitions
const ServiceContext = createContext({} as ServiceContextState)
// #endregion

// #region Hook definitions
export function useService() {
  return useContext(ServiceContext)
}
// #endregion

// #region Provider definition
export default function ServiceProvider({ children }: Readonly<ServiceProviderProps>) {
  // #region Memos
  const api = useMemo(() => axios.create({ baseURL: settings.apiUrl, withCredentials: true }), [])
  const state: ServiceContextState = useMemo(
    () => ({
      messagesService: new MessagesApiService({ api }),
      authService: new AuthApiService({ api }),
    }),
    [api]
  )
  // #endregion

  return <ServiceContext.Provider value={state}>{children}</ServiceContext.Provider>
}
// #endregion
