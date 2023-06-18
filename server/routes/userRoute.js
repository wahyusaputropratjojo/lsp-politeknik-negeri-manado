// Packages
import express from 'express';
import { Role } from '@prisma/client';

// Middleware
import { authenticationUser } from '../middlewares/authentication.js';
import { authorizationRole } from '../middlewares/authorization.js';

// Controllers
import {
	getUser,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
} from '../controllers/userController.js';

export const route = express.Router();

route.post('/', createUser);
route.get('/', getAllUsers);
route.get('/:id', getUser);
route.put('/:id', updateUser);
route.delete(
	'/:id',
	authenticationUser,
	authorizationRole(Role.Administrator, Role.Asesor, Role.Peserta),
	deleteUser,
);
