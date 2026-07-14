import { NextFunction, Request, Response } from 'express'
import { activeTrainingService } from '../services/activeTraining.service.js'

export class ActiveTrainingController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const activeTrainings = await activeTrainingService.getAll()

			res.status(200).json(activeTrainings)
		} catch (error) {
			next(error)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const activeTraining = await activeTrainingService.getById(id)

			if (!activeTraining) {
				return res.status(404).json({
					message: 'Active training not found',
				})
			}

			res.status(200).json(activeTraining)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const activeTraining = await activeTrainingService.create(req.body)

			res.status(201).json(activeTraining)
		} catch (error) {
			next(error)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const activeTraining = await activeTrainingService.update(id, req.body)

			res.status(200).json(activeTraining)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await activeTrainingService.delete(id)

			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export const activeTrainingController = new ActiveTrainingController()
