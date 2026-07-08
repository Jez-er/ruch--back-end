import { prisma } from '../utils/prisma.js'

export class ExerciseSetService {
	async getAll() {
		return prisma.exerciseSet.findMany({
			include: {
				exercise: true,
			},
		})
	}

	async getById(id: number) {
		return prisma.exerciseSet.findUnique({
			where: { id },
			include: {
				exercise: true,
			},
		})
	}

	async create(data: {
		exerciseId: number
		reps: number
		approach: number
		weight?: number
	}) {
		return prisma.exerciseSet.create({
			data,
		})
	}

	async update(
		id: number,
		data: Partial<{
			reps: number
			approach: number
			weight: number | null
		}>,
	) {
		return prisma.exerciseSet.update({
			where: { id },
			data,
		})
	}

	async delete(id: number) {
		return prisma.exerciseSet.delete({
			where: { id },
		})
	}
}

export const exerciseSetService = new ExerciseSetService()
