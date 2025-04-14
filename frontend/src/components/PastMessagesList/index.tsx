import { useMessages, useMessagesDispatch } from "@/contexts/MessagesProvider";
import { useService } from "@/contexts/ServiceProvider";
import { useEffect, useMemo } from "react";
import DefaultBackground from "../DefaultBackground";
import { Spinner } from "../Spinner";
import Message from "./components/Message";
import { MESSAGES_LIST_INTERVAL_MS } from "./constants/interval";

export default function PastMessagesList() {
  // #region Contexts
  const { messages } = useMessages();
  const messagesDispatch = useMessagesDispatch();
  // #endregion

  // #region Services
  const { messagesService } = useService();
  // #endregion

  // #region Memos
  const sortedMessages = useMemo(() => {
    return messages?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [messages]);
  // #endregion

  // #region Effects
  useEffect(() => {
    const interval = setInterval(() => {
      messagesService
        .listMessages()
        .then((response) => {
          messagesDispatch({ type: "set-messages", payload: response.messages });
        })
        .catch((error) => {
          console.error(error);
          messagesDispatch({ type: "set-messages", payload: [] });
        });
    }, MESSAGES_LIST_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);
  // #endregion

  return (
    <DefaultBackground className="messages flex-1 h-full gap-4">
      <h1 className="text-2xl font-bold">Fila de mensagens</h1>
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {!sortedMessages && (
          <div className="flex flex-col justify-center flex-1">
            <Spinner
              size="large"
              className="text-gray-300 self-center"
            />
          </div>
        )}
        {sortedMessages && (
          <>
            {sortedMessages.length === 0 && (
              <div className="flex flex-col justify-center basis-3/4">
                <span className="text-sm text-gray-500 text-center">
                  Fila vazia. Aproveite! Deixe uma mensagem e você será o próximo!
                </span>
              </div>
            )}
            {sortedMessages.length > 0 && ( //lembrar de voltar para > 0
              <div className="flex flex-col gap-1 overflow-auto px-2">
                {sortedMessages.map((message, index) => (
                  <Message
                    key={message.id}
                    message={message}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </DefaultBackground>
  );
}
