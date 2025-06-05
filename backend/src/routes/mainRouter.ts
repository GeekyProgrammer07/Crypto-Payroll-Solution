import { Router } from 'express'
import { authRouter } from './auth'
import { paymentsRouter } from './payments'

export const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/payments', paymentsRouter)
mainRouter.use('/payments', paymentsRouter)