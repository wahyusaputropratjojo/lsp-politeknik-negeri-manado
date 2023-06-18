import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	});
};

export const verifyAccessToken = (accessToken) => {
	return jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		(error, decoded) => {
			if (error) {
				return res.sendStatus(403);
			}
			return decoded;
		},
	);
};

export const verifyRefreshToken = (refreshToken) => {
	return jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(error, decoded) => {
			if (error) {
				return res.sendStatus(403);
			}
			return decoded;
		},
	);
};
