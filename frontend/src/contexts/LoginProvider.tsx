import { isAxiosError } from 'axios'
import { createContext, useContext, useEffect, useReducer, useRef } from 'react'
import { useService } from './ServiceProvider'

// #region Type definitions
type LoginProviderProps = React.PropsWithChildren

interface LoginContextState {
  /**
   * Defines whether the user is logged in or not.
   * - `null`: The website is verifying the user's login state.
   * - `true`: The user is logged in.
   * - `false`: The user is not logged in.
   */
  isLoggedIn: boolean | null
  /**
   * Defines whether the user is an admin or not.
   * - `null`: The website is verifying the user's admin state.
   * - `true`: The user is an admin.
   * - `false`: The user is not an admin.
   */
  isAdmin: boolean | null
}

interface LoginContextAction {
  type: 'set-is-logged-in' | 'set-is-admin'
  payload: boolean
}
// #endregion

// #region Context definitions
const LoginContext = createContext({} as LoginContextState)
const LoginContextDispatch = createContext({} as React.Dispatch<LoginContextAction>)
// #endregion

// #region Hook definitions
export function useLogin() {
  return useContext(LoginContext)
}
export function useLoginDispatch() {
  return useContext(LoginContextDispatch)
}
// #endregion

// #region Provider definition
export default function LoginProvider({ children }: Readonly<LoginProviderProps>) {
  const initialState: LoginContextState = {
    isLoggedIn: null,
    isAdmin: null,
  }

  const [state, dispatch] = useReducer(LoginReducer, initialState)

  // #region Services
  const { authService } = useService()
  // #endregion

  // #region Refs
  const isFetchingLoggedInState = useRef(false)
  // #endregion

  // #region Effects
  useEffect(() => {
    if (state.isLoggedIn !== null || isFetchingLoggedInState.current) return
    isFetchingLoggedInState.current = true

    const params = new URLSearchParams(window.location.search)
    const code = params.get('code') ?? sessionStorage.getItem('code') ?? undefined

    authService
      .validateCookieCode({ code })
      .then((res) => {
        dispatch({ type: 'set-is-logged-in', payload: true })
        dispatch({ type: 'set-is-admin', payload: res.isAdmin })
      })
      .catch((err: unknown) => {
        dispatch({ type: 'set-is-logged-in', payload: false })
        dispatch({ type: 'set-is-admin', payload: false })

        if (isAxiosError(err)) {
          if (err.response?.status === 400) {
            console.log('Missing code:', err.response?.data)
          }

          if (err.response?.status === 401) {
            sessionStorage.removeItem('code')
            console.log('Cookie invalidated:', err.response?.data)
          }
        }
      })
      .finally(() => {
        isFetchingLoggedInState.current = false
      })
  }, [authService, state.isLoggedIn])
  // #endregion

  return (
    <LoginContext.Provider value={state}>
      <LoginContextDispatch.Provider value={dispatch}>{children}</LoginContextDispatch.Provider>
    </LoginContext.Provider>
  )
}
// #endregion

// #region Reducer definition
function LoginReducer(state: LoginContextState, action: LoginContextAction): LoginContextState {
  switch (action.type) {
    case 'set-is-logged-in': {
      if (state.isLoggedIn === action.payload) return state

      return { ...state, isLoggedIn: action.payload }
    }
    case 'set-is-admin': {
      if (state.isAdmin === action.payload) return state

      return { ...state, isAdmin: action.payload }
    }
    default: {
      return state
    }
  }
}
// #endregion
