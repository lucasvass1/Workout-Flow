import { Request, Response } from 'express';
import { StudentService } from '../services/studentService.js';
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

export class StudentController {
  static async getStudents(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const page = Number(req.query.page) || 1;
      const search = String(req.query.search || '');

      const result = await StudentService.getStudents(userId!, page, search);

      res.json(result);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      res.status(500).json({
        error: 'Erro ao buscar alunos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async createStudent(req: Request, res: Response) {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const student = await StudentService.createStudent(userId, req.body);

      res.status(201).json(student);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      console.error('Erro ao criar aluno:', error);
      res.status(500).json({
        error: 'Erro ao criar aluno',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async updateStudent(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      const student = await StudentService.updateStudent(id, req.body);

      res.json(student);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: handleZodError(error),
        });
      }

      if (error instanceof Error && error.message.includes('P2025')) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      console.error('Erro ao atualizar aluno:', error);
      res.status(500).json({
        error: 'Erro ao atualizar aluno',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      const id = parseId(String(req.params.id));
      await StudentService.deleteStudent(id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof Error && error.message.includes('P2025')) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      console.error('Erro ao deletar aluno:', error);
      res.status(500).json({
        error: 'Erro ao deletar aluno',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
