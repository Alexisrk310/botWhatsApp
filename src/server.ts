import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.MONGODB_URI!)
	.then(() => {
		console.log('MongoDB conectado');
		app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
	})
	.catch((err) => {
		console.error('Error al conectar con MongoDB:', err);
	});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Bot escuchando en http://localhost:${PORT}`);
});
