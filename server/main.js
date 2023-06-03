import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
	console.log('');
	console.log(`Server berjalan di http://localhost:${port}`);
});
