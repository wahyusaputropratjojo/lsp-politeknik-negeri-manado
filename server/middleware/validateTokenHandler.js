import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const validateTokenHandler = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization;
	const accessToken = authHeader && authHeader.split(' ')[1];

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			res.status(401);
			throw new Error('Access Token tidak valid atau telah kadaluarsa!');
		}

		req.user = decoded;
		next();
	});
});
