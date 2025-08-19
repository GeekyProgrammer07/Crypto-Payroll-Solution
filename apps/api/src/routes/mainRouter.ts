import { Router } from 'express'
import { authRouter } from './auth'
import { paymentsRouter } from './payments'
import { invoicesRouter } from './invoices'
import { organisations } from './organistaions'

export const mainRouter: Router = Router()

mainRouter.use('/auth', authRouter) //TOdo: Complete the  two  wallet endpoints
mainRouter.use('/payments', paymentsRouter)
mainRouter.use('/invoices', invoicesRouter)
mainRouter.use('/organisations', organisations)
