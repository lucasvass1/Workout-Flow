import { prisma } from '../lib/prisma.js';
import { workoutCreateSchema, workoutUpdateSchema, exerciseCreateSchema } from '../schemas/workoutSchema.js';

export class WorkoutService {
  static async getWorkouts(userId: number) {
    return prisma.workout.findMany({
      where: { userId },
      include: {
        student: true,
        exercises: true,
      },
      orderBy: { id: 'desc' },
    });
  }

 static async createWorkout(userId: number, data: any) {
  const validatedData = workoutCreateSchema.parse(data);

  const student = await prisma.student.findUnique({
    where: { id: validatedData.studentId },
  });

  if (!student) {
    throw new Error(
      `Aluno com ID ${validatedData.studentId} não encontrado`
    );
  }

  const { name, studentId } = validatedData;

  return prisma.workout.create({
    data: {
      name,
      user: {
        connect: { id: userId },
      },
      student: {
        connect: { id: studentId },
      },
    },
    include: {
      student: true,
      exercises: true,
    },
  });
}

  static async updateWorkout(id: number, data: any) {
    const validatedData = workoutUpdateSchema.parse(data);

    if (validatedData.studentId) {
      const student = await prisma.student.findUnique({
        where: { id: validatedData.studentId },
      });
      if (!student) {
        throw new Error(
          `Aluno com ID ${validatedData.studentId} não encontrado`
        );
      }
    }

    return prisma.workout.update({
      where: { id },
      data: validatedData,
      include: {
        student: true,
        exercises: true,
      },
    });
  }

  static async deleteWorkout(id: number) {
    await prisma.workout.delete({
      where: { id },
    });
  }

  static async createExercise(workoutId: number, data: any) {
    const validatedData = exerciseCreateSchema.parse(data);

    return prisma.exercise.create({
      data: {
        ...validatedData,
        workout: {
          connect: { id: workoutId },
        },
      },
    });
  }

  static async getExercises(workoutId: number) {
    return prisma.exercise.findMany({
      where: { workoutId },
      orderBy: { id: 'desc' },
    });
  }

  static async updateExercise(id: number, data: any) {
    const validatedData = exerciseUpdateSchema.parse(data);

    return prisma.exercise.update({
      where: { id },
      data: validatedData,
    });
  }

  static async deleteExercise(id: number) {
    await prisma.exercise.delete({
      where: { id },
    });
  }
}
