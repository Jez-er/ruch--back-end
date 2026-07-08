import { Router } from 'express'
import { exerciseController } from '../controllers/exercise.controller.js'

const router = Router()

router.get('/', exerciseController.getAll.bind(exerciseController))

router.get('/:id', exerciseController.getById.bind(exerciseController))

router.post('/', exerciseController.create.bind(exerciseController))

router.patch('/:id', exerciseController.update.bind(exerciseController))

router.delete('/:id', exerciseController.delete.bind(exerciseController))

export default router
