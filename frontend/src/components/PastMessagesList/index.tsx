import { IMessage } from "@/@types/message";
import { useService } from "@/contexts/ServiceProvider";
import { useEffect, useState } from "react";
import { MESSAGES_LIST_INTERVAL_MS } from "./constants/interval";

export default function PastMessagesList() {
    // #region Services
    const { messagesService } = useService();
    // #endregion

    // #region States
    const [messages, setMessages] = useState<IMessage[]>([]);
    // #endregion

    // #region Effects
    useEffect(() => {
        const interval = setInterval(() => {
            messagesService.listMessages().then(response => {
                setMessages(response.messages)
            })
        }, MESSAGES_LIST_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);
    // #endregion

    return (
        <div className="flex flex-col gap-2 p-4 self-start items-center">
            <h1 className="text-2xl font-bold">Mensagens passadas</h1>
            {messages.length === 0 && (<span className="text-sm text-gray-500">Nenhuma mensagem encontrada</span>)}
            {messages.length > 0 && (
                <div className="flex flex-col gap-2">
                    {messages.map(message => (
                        <div className="flex flex-col gap-2" key={message.id}>
                            <div className="flex gap-1 justify-between">
                                <span>{message.name}</span>
                                <span>{message.createdAt.toLocaleString()}</span>
                            </div>
                            <span>{message.message}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}