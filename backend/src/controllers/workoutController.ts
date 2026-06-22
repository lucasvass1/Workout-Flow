import { Request, Response } from 'express';
import { WorkoutService } from '../services/workoutService.js';
import { ZodError } from 'zod';

function parseId(id: string) {
  const parsed = Number(id);
  if (isNaN(parsed)) {
    throw new Error('ID inválido');
  }
  return parsed;
}

function handleZodError(error: ZodError) {
  const errors = error.errors.map((err: any) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  return errors;
}

export class WorkoutController {
  static async getWorkouts(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const workouts = await WorkoutService.getWorkouts(userId!);

      res.json(workouts);
    } catch (error) {
      console.error('Erro ao buscar treinos:', error);
      res.status(500).json({
        error: 'Erro ao buscar treinos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async createWorkout(req: Request, res: Response) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const workout = await WorkoutService.createWorkout(userId, req.body);

      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';

      if (errorMsg.includes('não encontrado')) {
        return res.status(400).json({ error: errorMsg });
      }

      console.error('Erro ao criar treino:', error);
      res.status(500).json({
        error: 'Erro ao criar treino',
        message: errorMsg,
      });
    }
  }

  static async updateWorkout(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      const workout = await WorkoutService.updateWorkout(id, req.body);

      res.json(workout);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';

      if (errorMsg.includes('não encontrado')) {
        return res.status(404).json({ error: errorMsg });
      }

      console.error('Erro ao atualizar treino:', error);
      res.status(500).json({
        error: 'Erro ao atualizar treino',
        message: errorMsg,
      });
    }
  }

  static async deleteWorkout(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      await WorkoutService.deleteWorkout(id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('P2025')) {
        return res.status(404).json({ error: 'Treino não encontrado' });
      }

      console.error('Erro ao deletar treino:', error);
      res.status(500).json({
        error: 'Erro ao deletar treino',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async getExercises(req: Request, res: Response) {
    try {
      const workoutId = parseId(String(req.params.id));
      const exercises = await WorkoutService.getExercises(workoutId);

      res.json(exercises);
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error);
      res.status(500).json({
        error: 'Erro ao buscar exercícios',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async createExercise(req: Request, res: Response) {
    try {
      const workoutId = parseId(String(req.params.id));
      const exercise = await WorkoutService.createExercise(workoutId, req.body);

      res.status(201).json(exercise);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      console.error('Erro ao criar exercício:', error);
      res.status(500).json({
        error: 'Erro ao criar exercício',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async updateExercise(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      const exercise = await WorkoutService.updateExercise(id, req.body);

      res.json(exercise);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      console.error('Erro ao atualizar exercício:', error);
      res.status(500).json({
        error: 'Erro ao atualizar exercício',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async deleteExercise(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      await WorkoutService.deleteExercise(id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('P2025')) {
        return res.status(404).json({ error: 'Exercício não encontrado' });
      }

      console.error('Erro ao deletar exercício:', error);
      res.status(500).json({
        error: 'Erro ao deletar exercício',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
