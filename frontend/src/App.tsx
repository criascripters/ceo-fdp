import CeoFdp from "./assets/ceo-1.png"
import MainForm from "./components/MainForm"
import PastMessagesList from "./components/PastMessagesList"
import ServiceProvider from "./contexts/ServiceProvider"

function App() {
  return (
    <ServiceProvider>
      <div className="flex gap-4 items-center justify-center pt-10">
        <PastMessagesList />
        <div className="flex flex-col gap-4 items-center h-screen px-2">
          <img
            src={CeoFdp}
            alt="ceo-fdp"
            className="max-h-[300px] w-[400px] aspect-square object-top object-cover rounded-lg"
          />
          <MainForm />
        </div>
      </div>
    </ServiceProvider>
  )
}

export default App
