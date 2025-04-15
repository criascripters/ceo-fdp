import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainForm from "./components/MainForm";
import PastMessagesList from "./components/PastMessagesList";
import MessagesProvider from "./contexts/MessagesProvider";
import ServiceProvider from "./contexts/ServiceProvider";

function App() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 8) {
      setShowWarning(true);
    }
  }, []);
  return (
    <ServiceProvider>
      <div className="flex flex-col items-center h-screen bg-gray-200 px-2">
        {showWarning && (
          <div className="warning">
            <img
              className="clock"
              src="./clock.png"
              alt=""
            />
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
      </div>
      <Toaster />
      <Footer />
    </ServiceProvider>
  );
}

export default App;
