import { Router } from 'express'
import { exerciseLapController } from '../controllers/exerciseLap.controller.js'

const router = Router()

router.get('/', exerciseLapController.getAll.bind(exerciseLapController))

router.get('/:id', exerciseLapController.getById.bind(exerciseLapController))

router.post('/', exerciseLapController.create.bind(exerciseLapController))

router.patch('/:id', exerciseLapController.update.bind(exerciseLapController))

router.delete('/:id', exerciseLapController.delete.bind(exerciseLapController))

export default router
