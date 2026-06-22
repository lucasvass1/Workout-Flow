import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService.js';

export class DashboardController {
  static async getDashboard(req: Request, res: Response) {
    try {
      const userId = Number(req.userId);

      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const data = await DashboardService.getDashboardData(userId);

      res.json(data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      res.status(500).json({
        error: 'Erro ao carregar dashboard',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  }
}
