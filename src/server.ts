import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Bot escuchando en http://localhost:${PORT}`);
});
