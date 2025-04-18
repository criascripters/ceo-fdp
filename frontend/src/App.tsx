import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import LoginButton from "./components/DiscordLogin";
import Footer from "./components/Footer";
import MainContent from "./components/MainContent";
import OutOfOfficeWarning from "./components/OutOfOfficeWarning";
import ServiceProvider from "./contexts/ServiceProvider";

function App() {
  // tslint:disable:no-unused-variable
  const [showWarning, setShowWarning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(showWarning);
  console.log(isLoggedIn);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 8) {
      setShowWarning(true);
    }
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      sessionStorage.setItem("code", code);
      getCookie(code);
    }

    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      window.location.href = "/";
    }
    console.log("Wow, tu é mt hacker🤠");
  }, []);
  const getCookie = async (code: string) => {
    try {
      console.log("code getcookie:", code);
      await fetch(import.meta.env.VITE_API_URL + "/auth/discord", {
        method: "POST",
        body: JSON.stringify({ code: code }),
      }).then((res) => {
        console.log("res: ", res);
        if (res.status === 200) {
          //window.location.href = "/";
          localStorage.setItem("isLoggedIn", "true");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ServiceProvider>
      <LoginButton />
      {!isLoggedIn && <LoginButton />}
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
