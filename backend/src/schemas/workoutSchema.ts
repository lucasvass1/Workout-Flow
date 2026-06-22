import { z } from 'zod';

export const workoutCreateSchema = z.object({
  name: z.string().min(1, 'Nome do treino é obrigatório').max(255),
  studentId: z.coerce.number().int().positive(),
});

export const workoutUpdateSchema = workoutCreateSchema.partial();

export const exerciseCreateSchema = z.object({
  name: z.string().min(1, 'Nome do exercício é obrigatório').max(255),
  sets: z.coerce.number().int().positive('Séries deve ser positivo'),
  reps: z.coerce.number().int().positive('Repetições deve ser positivo'),
  weight: z.coerce.number().positive().optional().nullable(),
});

export const exerciseUpdateSchema = exerciseCreateSchema.partial();

export type WorkoutCreateInput = z.infer<typeof workoutCreateSchema>;
export type WorkoutUpdateInput = z.infer<typeof workoutUpdateSchema>;
export type ExerciseCreateInput = z.infer<typeof exerciseCreateSchema>;
export type ExerciseUpdateInput = z.infer<typeof exerciseUpdateSchema>;
