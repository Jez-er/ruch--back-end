import express from 'express'
import activeTrainingRoutes from './routes/activeTraining.route.js'
import exerciseRoutes from './routes/exercise.routes.js'
import exerciseLapRoutes from './routes/exerciseLap.routes.js'
import exerciseSetRoutes from './routes/exerciseSet.routes.js'
import trainingRoutes from './routes/training.routes.js'

const app = express()

app.use(express.json())

app.use('/exercise-sets', exerciseSetRoutes)
app.use('/exercise-laps', exerciseLapRoutes)
app.use('/exercises', exerciseRoutes)
app.use('/trainings', trainingRoutes)
app.use('/active-trainings', activeTrainingRoutes)

export default app
