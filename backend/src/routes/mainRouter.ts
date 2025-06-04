import { Router } from 'express'
import { authRouter } from './authRouter'

export const mainRouter = Router()

mainRouter.use('/auth', authRouter)