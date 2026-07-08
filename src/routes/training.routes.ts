import { Router } from 'express'
import { trainingController } from '../controllers/training.controller.js'

const router = Router()

router.get('/', trainingController.getAll.bind(trainingController))

router.get('/:id', trainingController.getById.bind(trainingController))

router.post('/', trainingController.create.bind(trainingController))

router.patch('/:id', trainingController.update.bind(trainingController))

router.delete('/:id', trainingController.delete.bind(trainingController))

export default router
