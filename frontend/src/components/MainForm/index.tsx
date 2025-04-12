"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMessagesDispatch } from "@/contexts/MessagesProvider";
import { useService } from "@/contexts/ServiceProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import DefaultBackground from "../DefaultBackground";
import "./index.css";
import { formSchema, IFormSchema } from "./utils/schema";

export default function MainForm() {
  // #region Services
  const { messagesService } = useService();
  const messagesDispatch = useMessagesDispatch();
  // #endregion

  // #region Form
  const form = useForm<IFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      targets: [],
    },
  });
  // #endregion

  // #region Callbacks
  function onSubmit(values: IFormSchema) {
    const payload = { name: values.name, message: values.message, targets: values.targets };
    console.log(values);
    console.log(payload);

    messagesService
      .addMessage(payload)
      .then(({ message }) => {
        form.reset();
        toast("Mensagem adicionada com sucesso");
        messagesDispatch({ type: "add-message", payload: message });
      })
      .catch((error) => {
        console.error(error);
        toast("Não foi possível enviar a mensagem. Tente novamente mais tarde.");
      });
  }
  // #endregion

  return (
    <DefaultBackground className="w-full flex-1 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-[400px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seu nome 🏳️</FormLabel>
                <FormControl>
                  <Input
                    placeholder="criascript"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Seu nome aparecerá junto com a mensagem do CEO fdp e no histórico de próximas mensagens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>A mensagem que o CEO fdp vai escrever 📢</FormLabel>
                <FormControl>
                  <Input
                    placeholder="cadê?????????????"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  O CEO fdp vai mandar exatamente essa mensagem marcando o Daniel e o Ítalo. Cobre-os de
                  verdade. 👺
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinatário 🎯</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Criascript",
                      "SalsichaDev",
                      "Capetalista",
                      "Daniel",
                      "Alex",
                      "Rogerin",
                      "Vinicius",
                    ].map((person) => (
                      <label
                        key={person}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={field.value.includes(person)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Se a checkbox for marcada, adiciona o item
                              field.onChange([...field.value, person]);
                            } else {
                              // Se a checkbox for desmarcada, remove o item
                              field.onChange(field.value.filter((item) => item !== person));
                            }
                          }}
                        />
                        <span>{person}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormDescription>Escolha os destinatários</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="float-right bg-yellow-300 text-black hover:bg-yellow-500"
          >
            Adicionar mensagem
          </Button>
        </form>
      </Form>
    </DefaultBackground>
  );
}
