import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { adminAuth } from "../middleware/adminAuth";
import { organisationController } from "../controllers/organisations/organisationController";

export const organisations: Router = Router();

// organisations.get('/', authenticate, adminAuth, organisationController)
organisations.post('/', authenticate, adminAuth, organisationController)