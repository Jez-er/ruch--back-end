import { prisma } from '../utils/prisma.js'

export class ExerciseService {
	async getAll() {
		return prisma.exercise.findMany({
			include: {
				sets: true,
				laps: true,
			},
		})
	}

	async getById(id: number) {
		return prisma.exercise.findUnique({
			where: { id },
			include: {
				sets: true,
				laps: true,
			},
		})
	}

	async create(data: { trainingId: number; name: string }) {
		return prisma.exercise.create({
			data,
			include: {
				sets: true,
				laps: true,
			},
		})
	}

	async update(
		id: number,
		data: Partial<{
			name: string
			trainingId: number
		}>,
	) {
		return prisma.exercise.update({
			where: { id },
			data,
			include: {
				sets: true,
				laps: true,
			},
		})
	}

	async delete(id: number) {
		return prisma.exercise.delete({
			where: { id },
		})
	}
}

export const exerciseService = new ExerciseService()
