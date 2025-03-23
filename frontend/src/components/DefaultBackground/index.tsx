interface IDefaultBackgroundProps {
    theme?: "primary" | "secondary"
    className?: string
}

export default function DefaultBackground({ children, theme = "primary", className }: Readonly<React.PropsWithChildren<IDefaultBackgroundProps>>) {
    return (
        <div className={`flex flex-col gap-2 p-6 self-start items-center rounded-xl shadow-lg
            ${theme === "primary" ? "bg-white" : "bg-yellow-300"}
            ${className}
        `}>
            {children}
        </div>
    )
}