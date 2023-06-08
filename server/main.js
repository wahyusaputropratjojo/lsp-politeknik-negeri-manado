// import package
import express from 'express';
import cors from 'cors';

// import middleware
import { errorHandler } from './middleware/errorHandler.js';

// import router
import { router as userRoute } from './routes/userRoute.js';

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);
app.use(errorHandler);

app.listen(port, () => {
	console.log('');
	console.log(`Server berjalan di http://localhost:${port}`);
});
