import logo from "@/assets/ceo-1.png";

export default function Header() {
    return (
        <div className={`flex gap-2 items-center rounded-xl shadow-lg max-h-[100px]
            bg-yellow-300 overflow-hidden
        `}>
            <div className="flex-1 self-start -mt-6">
                <img src={logo} alt="P.O. ARROMBADO" className="object-fill float-left rounded-s-lg object-top" />
            </div>
            <div className="flex flex-col w-full justify-center items-center flex-1">
                <h1 className="font-bold text-xl">P.O. ARROMBADO</h1>
                <p>Central do cliente</p>
            </div>
        </div>
    )
}