import { NextFunction, Request, Response } from 'express'
import { exerciseSetService } from '../services/exerciseSet.service.js'

export class ExerciseSetController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const exerciseSets = await exerciseSetService.getAll()

			res.status(200).json(exerciseSets)
		} catch (error) {
			next(error)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exerciseSet = await exerciseSetService.getById(id)

			if (!exerciseSet) {
				return res.status(404).json({
					message: 'Exercise set not found',
				})
			}

			res.status(200).json(exerciseSet)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const exerciseSet = await exerciseSetService.create(req.body)

			res.status(201).json(exerciseSet)
		} catch (error) {
			next(error)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exerciseSet = await exerciseSetService.update(id, req.body)

			res.status(200).json(exerciseSet)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await exerciseSetService.delete(id)

			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export const exerciseSetController = new ExerciseSetController()
