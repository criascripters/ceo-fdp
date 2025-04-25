import { IMessage } from '@/@types/message'
import { createContext, useContext, useReducer } from 'react'

// #region Type definitions
interface MessagesProviderProps {
  children: React.ReactNode
}

interface MessagesContextState {
  messages?: IMessage[]
}

type MessagesContextAction =
  | {
      type: 'set-messages'
      payload: IMessage[]
    }
  | {
      type: 'add-message'
      payload: IMessage
    }
  | {
      type: 'delete-message'
      messageId: string
    }
// #endregion

// #region Context definitions
const MessagesContext = createContext({} as MessagesContextState)
const MessagesContextDispatch = createContext({} as React.Dispatch<MessagesContextAction>)
// #endregion

// #region Hook definitions
export function useMessages() {
  return useContext(MessagesContext)
}
export function useMessagesDispatch() {
  return useContext(MessagesContextDispatch)
}
// #endregion

// #region Provider definition
export default function MessagesProvider({ children }: Readonly<MessagesProviderProps>) {
  const initialState: MessagesContextState = {}

  const [state, dispatch] = useReducer(MessagesReducer, initialState)

  return (
    <MessagesContext.Provider value={state}>
      <MessagesContextDispatch.Provider value={dispatch}>{children}</MessagesContextDispatch.Provider>
    </MessagesContext.Provider>
  )
}
// #endregion

// #region Reducer definition
function MessagesReducer(state: MessagesContextState, action: MessagesContextAction): MessagesContextState {
  switch (action.type) {
    case 'set-messages': {
      return {
        ...state,
        messages: action.payload,
      }
    }
    case 'add-message': {
      return {
        ...state,
        messages: [...(state.messages ?? []), action.payload],
      }
    }
    case 'delete-message': {
      return {
        ...state,
        messages: state.messages?.filter((message) => message.id !== action.messageId),
      }
    }
    default: {
      return state
    }
  }
}
// #endregion
