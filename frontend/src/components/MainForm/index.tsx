"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useService } from "@/contexts/ServiceProvider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema, IFormSchema } from "./utils/schema"

export default function MainForm() {
    // #region Services
    const { messagesService } = useService()
    // #endregion

    // #region Form
    const form = useForm<IFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            message: "",
        },
    })
    // #endregion

    // #region Callbacks
    function onSubmit(values: IFormSchema) {
        messagesService.sendMessage({
            name: values.name,
            message: values.message,
        }).then(() => {
            form.reset()

            // TODO: dar feedback de sucesso + atualizar lista futura de mensagens enviadas
        }).catch((error) => {
            console.error(error)

            // TODO: dar feedback de erro
        })
    }
    // #endregion

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-[400px]">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seu nome 🏳️</FormLabel>
                            <FormControl>
                                <Input placeholder="criascript" {...field} />
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
                                <Input placeholder="cadê?????????????" {...field} />
                            </FormControl>
                            <FormDescription>
                                O CEO fdp vai mandar exatamente essa mensagem marcando o Daniel e o Ítalo. Cobre-os de
                                verdade. 👺
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Enviar</Button>
            </form>
        </Form>
    )
}
