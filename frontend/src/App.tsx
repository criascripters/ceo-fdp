import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import OutOfOfficeWarning from "./components/OutOfOfficeWarning";
import ServiceProvider from "./contexts/ServiceProvider";

function App() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 8) {
      setShowWarning(true);
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      sessionStorage.setItem("code", code);
      console.log("Código OAuth recebido:", code);
    }
  }, []);

  return (
    <ServiceProvider>
      <div className="flex flex-col justify-between items-center h-screen overflow-hidden bg-gray-300">
        <OutOfOfficeWarning />
        <MainContent />
        <Footer />
      </div>
      <Toaster />
    </ServiceProvider>
  );
}

export default App;
