// import package
import express from 'express';

// import controller function
import {
	getUser,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	registerUser,
	loginUser,
	currentUser,
} from '../controllers/userController.js';

// import middeleware
import { validateTokenHandler } from '../middleware/validateTokenHandler.js';

export const router = express.Router();

router.post('/', createUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', validateTokenHandler, currentUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
