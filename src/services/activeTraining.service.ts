import { prisma } from '../utils/prisma.js'

export class ActiveTrainingService {
	async getAll() {
		return prisma.activeTraining.findMany({
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
		return prisma.activeTraining.findUnique({
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
		return prisma.activeTraining.create({
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
		return prisma.activeTraining.update({
			where: { id },
			data,
			include: {
				exercises: true,
			},
		})
	}

	async delete(id: number) {
		return prisma.activeTraining.delete({
			where: { id },
		})
	}
}

export const activeTrainingService = new ActiveTrainingService()
