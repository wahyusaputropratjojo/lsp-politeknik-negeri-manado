import asyncHandler from 'express-async-handler';
import { verifyAccessToken } from '../utils/jwt.js';

export const authenticationUser = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

	const accessToken = authHeader && authHeader.split(' ')[1];

	const decoded = verifyAccessToken(accessToken);

	req.user = decoded;
	console.log(req.user);

	next();
});
