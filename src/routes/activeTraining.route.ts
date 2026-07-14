import { Router } from 'express'
import { activeTrainingController } from '../controllers/activeTraining.controller.js'

const router = Router()

router.get('/', activeTrainingController.getAll.bind(activeTrainingController))

router.get(
	'/:id',
	activeTrainingController.getById.bind(activeTrainingController),
)

router.post('/', activeTrainingController.create.bind(activeTrainingController))

router.patch(
	'/:id',
	activeTrainingController.update.bind(activeTrainingController),
)

router.delete(
	'/:id',
	activeTrainingController.delete.bind(activeTrainingController),
)

export default router
