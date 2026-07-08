import { NextFunction, Request, Response } from 'express'
import { exerciseLapService } from '../services/exerciseLap.service.js'

export class ExerciseLapController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const exerciseLaps = await exerciseLapService.getAll()

			res.status(200).json(exerciseLaps)
		} catch (error) {
			next(error)
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exerciseLap = await exerciseLapService.getById(id)

			if (!exerciseLap) {
				return res.status(404).json({
					message: 'Exercise lap not found',
				})
			}

			res.status(200).json(exerciseLap)
		} catch (error) {
			next(error)
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const exerciseLap = await exerciseLapService.create(req.body)

			res.status(201).json(exerciseLap)
		} catch (error) {
			next(error)
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			const exerciseLap = await exerciseLapService.update(id, req.body)

			res.status(200).json(exerciseLap)
		} catch (error) {
			next(error)
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id)

			await exerciseLapService.delete(id)

			res.status(204).send()
		} catch (error) {
			next(error)
		}
	}
}

export const exerciseLapController = new ExerciseLapController()
