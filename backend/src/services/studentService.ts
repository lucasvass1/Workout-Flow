import { prisma } from '../lib/prisma.js';
import { studentCreateSchema, studentUpdateSchema } from '../schemas/studentSchema.js';

export class StudentService {
  static async getStudents(
    userId: number,
    page = 1,
    search = '',
    limit = 10
  ) {
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where: {
          userId,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.student.count({
        where: {
          userId,
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      students,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async createStudent(userId: number, data: any) {
    
    const validatedData = studentCreateSchema.parse(data);

    const student = await prisma.student.create({
      data: {
        ...validatedData,
        user: {
          connect: { id: userId },
        },
      },
    });

    return student;
  }

  static async updateStudent(id: number, data: any) {
    
    const validatedData = studentUpdateSchema.parse(data);

    const student = await prisma.student.update({
      where: { id },
      data: validatedData,
    });

    return student;
  }

  static async deleteStudent(id: number) {
    await prisma.student.delete({
      where: { id },
    });
  }
}
