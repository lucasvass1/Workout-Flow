import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),

  age: z.number().min(10, "Idade inválida"),

  plan: z.string().min(1, "Selecione um plano"),

  joinedAt: z.string().min(1, "Data obrigatória"),

  isActive: z.boolean(),
});

export type StudentFormData = z.infer<typeof studentSchema>;