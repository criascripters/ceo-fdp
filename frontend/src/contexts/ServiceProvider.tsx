import MessagesApiService from "@/services/messages/api/messages.api"
import IMessagesGateway from "@/services/messages/IMessagesGateway"
import axios from "axios"
import { createContext, useContext, useMemo } from "react"

// #region Type definitions
interface ServiceProviderProps {
    children: React.ReactNode
}

interface ServiceContextState {
    messagesService: IMessagesGateway
}
// #endregion

// #region Context definitions
const ServiceContext = createContext(
    {} as ServiceContextState
)
// #endregion

// #region Hook definitions
export function useService() {
    return useContext(ServiceContext)
}
// #endregion

// #region Provider definition
export default function ServiceProvider({
    children
}: Readonly<ServiceProviderProps>) {
    // #region Memos
    const api = useMemo(() => axios.create({ baseURL: import.meta.env.VITE_API_URL }), [])
    const state: ServiceContextState = useMemo(() => ({
        messagesService: new MessagesApiService({ api })
    }), [api])
    // #endregion

    return (
        <ServiceContext.Provider value={state}>
            {children}
        </ServiceContext.Provider>
    )
}
// #endregion
