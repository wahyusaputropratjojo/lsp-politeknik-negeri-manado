// Packages
import express from 'express';
import { Role } from '@prisma/client';

// Middleware
import { authenticationUser } from '../middlewares/authentication.js';
import { authorizationRole } from '../middlewares/authorization.js';

// Controllers
import {
	getUser,
	listUser,
	createUser,
	updateUser,
	deleteUser,
} from '../controllers/userController.js';

export const route = express.Router();

route.post('/', createUser);
route.get('/', listUser);
route.get('/:id', getUser);
route.patch('/:id', updateUser);
route.delete('/:id', deleteUser);
