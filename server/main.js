// Packages
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Configs
import { corsOptions } from './configs/corsOptions.js';

// Middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { credentials } from './middlewares/credentials.js';

// Routes
import { route as authRoute } from './routes/authRoute.js';
import { route as userRoute } from './routes/userRoute.js';

const app = express();

const port = 3000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

app.use(errorHandler);

app.listen(port, () => {
	console.log('');
	console.log(`Server berjalan di http://localhost:${port}`);
});
