import { FaDiscord } from "react-icons/fa";

export default function LoginButton() {
  const discordLogin = () => {
    const clientId = import.meta.env.VITE_DISCORD_ID;
    const redirectUri = encodeURIComponent("https://po.criascript.dev/");
    const scope = encodeURIComponent("identify email");

    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1e1e2f] to-[#15161c]">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl text-center max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <FaDiscord className="text-indigo-400 text-5xl" />
        </div>
        <h1 className="text-white text-3xl font-bold mb-2">Entrar com Discord</h1>
        <p className="text-gray-300 mb-6">Acesse sua conta para continuar</p>
        <button
          onClick={discordLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2.5 rounded-full shadow-lg flex items-center justify-center gap-2"
        >
          <FaDiscord className="text-lg" />
          Conectar com Discord
        </button>
      </div>
    </div>
  );
}
