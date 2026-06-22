import { z } from 'zod';

export const studentCreateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(255),
  age: z.number().int().min(1).max(150),
  plan: z.enum(['Básico', 'Intermediário', 'Avançado'] as const, {
    errorMap: () => ({
      message: 'Plano deve ser: Básico, Intermediário ou Avançado',
    }),
  }),
  joinedAt: z.string().or(z.date()).transform((val: any) => new Date(val)),
  isActive: z.boolean().default(true),
});

export const studentUpdateSchema = studentCreateSchema.partial();

export type StudentCreateInput = z.infer<typeof studentCreateSchema>;
export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;
