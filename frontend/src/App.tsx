import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import LoginButton from "./components/DiscordLogin";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import OutOfOfficeWarning from "./components/OutOfOfficeWarning";
import ServiceProvider from "./contexts/ServiceProvider";
import MessagesProvider from "./contexts/MessagesProvider";
import PastMessagesList from "./components/PastMessagesList";
import Header from "./components/Header";
import MainForm from "./components/MainForm";

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
      <LoginButton />
      <div className="flex flex-col items-center h-screen bg-gray-200 px-2 justify-between">
        {showWarning && (
          <div className="warning">
            <img className="clock" src="./clock.png" alt="Relógio" />
            <span>JÁ PASSOU DAS 18H MALUCO, TO NO BAR BEBENDO. VOLTO A MANDAR MENSAGENS AMANHÃ AS 8H</span>
          </div>
        )}

        <div className="flex gap-4 items-center justify-center overflow-auto flex-1 max-w-[1000px] basis-2/3 max-h-[80%]">
          <MessagesProvider>
            <div className="main">
              <PastMessagesList />
              <div className="flex-2 flex flex-col gap-4 items-center self-start h-full">
                <Header />
                <MainForm />
              </div>
            </div>
          </MessagesProvider>
        </div>

        <Footer />
      </div>
      <Toaster />
    </ServiceProvider>
  );
}

export default App;
