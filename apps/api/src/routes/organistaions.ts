import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { adminAuth } from "../middleware/adminAuth";
import { addOrganisationController } from "../controllers/organisations/addOrganisationController";
import { deleteOrganisaion } from "../controllers/organisations/deleteOrganisation";

export const organisations: Router = Router();

organisations.post('/create', authenticate, adminAuth, addOrganisationController);
organisations.delete('/delete', authenticate, adminAuth, deleteOrganisaion);
// organisations.get('/',authenticate, getOrgDetails);
// organisations.get(':params',authenticate, getOrgDetailsById);
