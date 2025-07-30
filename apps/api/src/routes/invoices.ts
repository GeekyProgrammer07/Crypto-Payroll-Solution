import { Router } from "express";
import invoices from "../controllers/invoices/invoices";

export const invoicesRouter: Router = Router()

invoicesRouter.post('/invoices', invoices);