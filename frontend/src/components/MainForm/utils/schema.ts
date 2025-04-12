import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Nome deve ter pelo menos 2 caracteres",
    })
    .max(30, {
      message: "Nome deve ter no máximo 30 caracteres",
    }),
  message: z
    .string()
    .min(5, {
      message: "Mensagem deve ter pelo menos 5 caracteres",
    })
    .max(100, {
      message: "Mensagem deve ter no máximo 100 caracteres",
    }),
  targets: z.array(z.string()).min(0, {
    message: "Selecione pelo menos um destino",
  }),
});

export type IFormSchema = z.infer<typeof formSchema>;
