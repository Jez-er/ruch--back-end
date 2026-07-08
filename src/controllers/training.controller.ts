import { NextFunction, Request, Response } from 'express'
import { trainingService } from '../services/training.service.js'

export class TrainingController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const trainings = await trainingService.getAll()

			res.status(200).json(trainings)
		} catch (error) {
			next(error)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const training = await trainingService.getById(id)

			if (!training) {
				return res.status(404).json({
					message: 'Training not found',
				})
			}

			res.status(200).json(training)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const training = await trainingService.create(req.body)

			res.status(201).json(training)
		} catch (error) {
			next(error)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const training = await trainingService.update(id, req.body)

			res.status(200).json(training)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await trainingService.delete(id)

			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export const trainingController = new TrainingController()
