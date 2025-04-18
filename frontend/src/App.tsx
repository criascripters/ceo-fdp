import { Toaster } from '@/components/ui/sonner'
import LoginButton from './components/DiscordLogin'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import OutOfOfficeWarning from './components/OutOfOfficeWarning'
import { Spinner } from './components/Spinner'
import { useLogin } from './contexts/LoginProvider'

function App() {
  // #region Contexts
  const { isLoggedIn } = useLogin()
  // #endregion

  if (isLoggedIn === null)
    return (
      <div className="bg-transparent h-screen flex flex-col justify-center">
        <Spinner />
      </div>
    )

  if (!isLoggedIn) return <LoginButton />

  return (
    <div className="flex flex-col justify-between items-center h-screen overflow-hidden bg-gray-300">
      <OutOfOfficeWarning />
      <MainContent />
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
