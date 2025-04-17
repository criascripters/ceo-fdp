export default function Footer() {
    return (
        <div className="w-full flex justify-center items-center bg-yellow-300 rounded-t-lg py-1">
            <p className="text-black font-medium">
                Feito pela comunidade do{" "}
                <a href="https://criascript.dev" target="_blank" rel="noreferrer" className="text-blue-500 underline">
                    CriaScript
                </a>
                {" "}@ {new Date().getFullYear()}
            </p>
        </div>
    )
}