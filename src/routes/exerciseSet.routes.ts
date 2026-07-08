import { Router } from 'express'
import { exerciseSetController } from '../controllers/exerciseSet.controller.js'

const router = Router()

router.get('/', exerciseSetController.getAll.bind(exerciseSetController))

router.get('/:id', exerciseSetController.getById.bind(exerciseSetController))

router.post('/', exerciseSetController.create.bind(exerciseSetController))

router.patch('/:id', exerciseSetController.update.bind(exerciseSetController))

router.delete('/:id', exerciseSetController.delete.bind(exerciseSetController))

export default router
