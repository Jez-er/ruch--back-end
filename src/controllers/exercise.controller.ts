import { NextFunction, Request, Response } from 'express'
import { exerciseService } from '../services/exercise.service.js'

export class ExerciseController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const exercises = await exerciseService.getAll()

			res.status(200).json(exercises)
		} catch (error) {
			next(error)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exercise = await exerciseService.getById(id)

			if (!exercise) {
				return res.status(404).json({
					message: 'Exercise not found',
				})
			}

			res.status(200).json(exercise)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const exercise = await exerciseService.create(req.body)

			res.status(201).json(exercise)
		} catch (error) {
			next(error)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exercise = await exerciseService.update(id, req.body)

			res.status(200).json(exercise)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await exerciseService.delete(id)

			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export const exerciseController = new ExerciseController()
