import { Toaster } from "@/components/ui/sonner"
import Footer from "./components/Footer"
import Header from "./components/Header"
import MainForm from "./components/MainForm"
import PastMessagesList from "./components/PastMessagesList"
import MessagesProvider from "./contexts/MessagesProvider"
import ServiceProvider from "./contexts/ServiceProvider"

function App() {
  return (
    <ServiceProvider>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200 px-2">
        <div className="flex gap-4 items-center justify-center max-w-[1000px] h-max basis-2/3 max-h-[80%]">
          <MessagesProvider>
            <PastMessagesList />
            <div className="flex-2 flex flex-col gap-4 items-center self-start h-full">
              <Header />
              <MainForm />
            </div>
          </MessagesProvider>
        </div>
      </div>
      <Toaster />
      <Footer />
    </ServiceProvider>
  )
}

export default App
