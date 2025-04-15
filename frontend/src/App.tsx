import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import OutOfOfficeWarning from "./components/OutOfOfficeWarning";
import ServiceProvider from "./contexts/ServiceProvider";

function App() {
  return (
    <ServiceProvider>
      <div className="flex flex-col justify-between items-center h-screen overflow-hidden bg-gray-200">
        <OutOfOfficeWarning />
        <MainContent />
        <Footer />
      </div>
      <Toaster />
    </ServiceProvider>
  );
}

export default App;
