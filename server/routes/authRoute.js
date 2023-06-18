// Packages
import express from 'express';

// Controllers
import {
	register,
	login,
	logout,
	logoutAll,
	accessTokenRefresh,
} from '../controllers/authController.js';

export const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.delete('/logout', logout);
route.delete('/logout/all', logoutAll);
route.get('/token/access/refresh', accessTokenRefresh);
