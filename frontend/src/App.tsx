import CeoFdp from "./assets/ceo-1.png"
import MainForm from "./components/MainForm"
import ServiceProvider from "./contexts/ServiceProvider"

function App() {
  return (
    <ServiceProvider>
      <div className="flex flex-col gap-4 items-center h-screen pt-10 px-2">
        <img
          src={CeoFdp}
          alt="ceo-fdp"
          className="max-h-[300px] w-[400px] aspect-square object-top object-cover rounded-lg"
        />
        <MainForm />
      </div>
    </ServiceProvider>
  )
}

export default App
