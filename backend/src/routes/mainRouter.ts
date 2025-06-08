import { Router } from 'express'
import { authRouter } from './auth'
import { paymentsRouter } from './payments'
import { invoicesRouter } from './invoices'
import { organisations } from './organistaions'

export const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/payments', paymentsRouter)
mainRouter.use('/invoices', invoicesRouter)
mainRouter.use('/organisations', organisations)
