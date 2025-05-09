import { VercelRequest, VercelResponse } from '@vercel/node';
import { config } from 'dotenv';

// Cargar las variables de entorno
config();

import { handleIncomingMessage } from '../application/use-cases/HandleIncomingMessage';
import { buildTwilioResponse } from '../infrastructure/services/TwilioResponseBuilder';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { Body, From } = req.body;

	// Procesar el mensaje entrante
	const reply = handleIncomingMessage(Body);

	// Crear la respuesta de Twilio
	const response = buildTwilioResponse(reply);

	// Si se desea enviar un mensaje de vuelta (opcional), usa client.messages.create
	// await client.messages.create({
	//   from: 'whatsapp:+14155238886',
	//   to: From, // Número de quien envió el mensaje
	//   body: 'Aquí está tu respuesta automática.'
	// });

	// Configurar la respuesta XML de Twilio
	res.setHeader('Content-Type', 'text/xml');
	res.status(200).send(response);
}
