import { prisma } from '../utils/prisma.js'

export class ExerciseLapService {
	async getAll() {
		return prisma.exerciseLap.findMany({
			include: {
				exercise: true,
			},
		})
	}

	async getById(id: number) {
		return prisma.exerciseLap.findUnique({
			where: { id },
			include: {
				exercise: true,
			},
		})
	}

	async create(data: {
		exerciseId: number
		lapNumber: number
		duration: number
		distance?: number
	}) {
		return prisma.exerciseLap.create({
			data,
		})
	}

	async update(
		id: number,
		data: Partial<{
			lapNumber: number
			duration: number
			distance: number | null
		}>,
	) {
		return prisma.exerciseLap.update({
			where: { id },
			data,
		})
	}

	async delete(id: number) {
		return prisma.exerciseLap.delete({
			where: { id },
		})
	}
}

export const exerciseLapService = new ExerciseLapService()
