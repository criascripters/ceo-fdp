import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import LoginButton from "./components/DiscordLogin";
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
      console.log(showWarning);
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      sessionStorage.setItem("code", code);
      getCookie(code);
    }
  }, []);
  const getCookie = async (code: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/auth/discord", {
        method: "POST",
        body: JSON.stringify({ code: code }),
      }).then((res) => {
        console.log(response);
        console.log(res.status);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ServiceProvider>
      <LoginButton />
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
