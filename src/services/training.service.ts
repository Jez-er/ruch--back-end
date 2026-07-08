import { prisma } from '../utils/prisma.js'

export class TrainingService {
	async getAll() {
		return prisma.training.findMany({
			include: {
				exercises: {
					include: {
						sets: true,
						laps: true,
					},
				},
			},
			orderBy: {
				date: 'desc',
			},
		})
	}

	async getById(id: number) {
		return prisma.training.findUnique({
			where: { id },
			include: {
				exercises: {
					include: {
						sets: true,
						laps: true,
					},
				},
			},
		})
	}

	async create(data: {
		type: 'RUNNING' | 'SWIMMING' | 'CYCLING' | 'GYM' | 'STRETCHING' | 'YOGA'
		duration: number
		calories: number
		date: Date
	}) {
		return prisma.training.create({
			data,
			include: {
				exercises: true,
			},
		})
	}

	async update(
		id: number,
		data: Partial<{
			type: 'RUNNING' | 'SWIMMING' | 'CYCLING' | 'GYM' | 'STRETCHING' | 'YOGA'
			duration: number
			calories: number
			date: Date
		}>,
	) {
		return prisma.training.update({
			where: { id },
			data,
			include: {
				exercises: true,
			},
		})
	}

	async delete(id: number) {
		return prisma.training.delete({
			where: { id },
		})
	}
}

export const trainingService = new TrainingService()
