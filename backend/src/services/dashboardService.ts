import { prisma } from '../lib/prisma.js';
import { PLAN_PRICES } from '../Constants/plans.js';

type MonthlyStudentsRow = {
  month: Date;
  newStudents: number;
};

export type StudentGrowthPoint = {
  month: string;
  newStudents: number;
  totalStudents: number;
};

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function addMonths(date: Date, months: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
}

function monthKey(date: Date) {
  return date.toISOString().slice(0, 7);
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  })
    .format(date)
    .replace('.', '');
}

export class DashboardService {
  static async getDashboardData(userId: number) {
    // Contar totais básicos
    const totalStudents = await prisma.student.count({
      where: { userId },
    });

    const activeStudents = await prisma.student.count({
      where: { userId, isActive: true } as any,
    });

    const inactiveStudents = await prisma.student.count({
      where: { userId, isActive: false } as any,
    });

    const totalWorkouts = await prisma.workout.count({
      where: { userId },
    });

    // Calcular período do mês
    const today = new Date();
    const firstDayCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const firstDayNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const firstDayPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );

    // Novos alunos no mês atual
    const newStudents = await prisma.student.count({
      where: {
        userId,
        joinedAt: {
          gte: firstDayCurrentMonth,
          lt: firstDayNextMonth,
        },
      } as any,
    });

    // Alunos no mês anterior
    const previousMonthStudents = await prisma.student.count({
      where: {
        userId,
        joinedAt: {
          gte: firstDayPreviousMonth,
          lt: firstDayCurrentMonth,
        },
      } as any,
    });

  
    let growth = 0;
    if (previousMonthStudents === 0) {
     
      growth = newStudents > 0 ? 100 : 0;
    } else {
      
      growth = Number(
        (
          ((newStudents - previousMonthStudents) / previousMonthStudents) * 100
        ).toFixed(1)
      );
    }

    
    const activeStudentsData = await prisma.student.findMany({
      where: {
        userId,
        isActive: true,
      } as any,
    });

    let revenue = 0;
    for (const student of activeStudentsData) {
      const planName = student.plan as keyof typeof PLAN_PRICES;
      const price = PLAN_PRICES[planName];

      
      if (!price) {
        console.warn(`Plano inválido para aluno ${student.id}: ${student.plan}`);
        continue;
      }

      revenue += price;
    }

    
    const activeRate =
      totalStudents === 0
        ? 0
        : Number(((activeStudents / totalStudents) * 100).toFixed(1));

   
    const plansCount = {
      basico: activeStudentsData.filter(s => s.plan === 'Básico').length,
      intermediario: activeStudentsData.filter(s => s.plan === 'Intermediário')
        .length,
      avancado: activeStudentsData.filter(s => s.plan === 'Avançado').length,
    };

    const currentMonthStart = startOfMonth(new Date());
    const windowStart = addMonths(currentMonthStart, -11);
    const nextMonthStart = addMonths(currentMonthStart, 1);

    const [baselineStudents, monthlyRows] = await Promise.all([
     prisma.student.count({
        where: {
          userId,
          joinedAt: {
            lt: windowStart,
          },
        },
      } as any),
      prisma.$queryRaw<MonthlyStudentsRow[]>`
        SELECT
          date_trunc('month', "joinedAt") AS month,
          COUNT(*)::int AS "newStudents"
        FROM "Student"
        WHERE "userId" = ${userId}
          AND "joinedAt" >= ${windowStart}
          AND "joinedAt" < ${nextMonthStart}
        GROUP BY 1
        ORDER BY 1 ASC
      `,
    ]);

    const monthlyMap = new Map(
      monthlyRows.map((row) => [monthKey(new Date(row.month)), row.newStudents])
    );

    let cumulativeStudents = baselineStudents;
    const studentGrowth: StudentGrowthPoint[] = Array.from({ length: 12 }, (_, index) => {
      const monthDate = addMonths(windowStart, index);
      const key = monthKey(monthDate);
      const newStudents = monthlyMap.get(key) ?? 0;

      cumulativeStudents += newStudents;

      return {
        month: formatMonthLabel(monthDate),
        newStudents,
        totalStudents: cumulativeStudents,
      };
    });

    return {
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalWorkouts,
      newStudents,
      revenue: Number(revenue.toFixed(2)), // Arredondar para 2 casas decimais
      growth,
      activeRate,
      plansCount,
      studentGrowth,
    };
  }
}
