import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { adminAuth } from "../middleware/adminAuth";
import { organisationController } from "../controllers/organisations/organisationController";

export const organisations: Router = Router();

organisations.post('/create', authenticate, adminAuth, organisationController)