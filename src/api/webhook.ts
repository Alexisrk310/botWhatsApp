import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';
import dbConnect from '../lib/dbConnect';
import { AgentModel } from '../models/Agent';

import { getMenuMessage } from '../utils/messages';
import { SessionModel } from '../models/Session';

const twilioClient = twilio(
	process.env.TWILIO_ACCOUNT_SID!,
	process.env.TWILIO_AUTH_TOKEN!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

	await dbConnect();

	const from = req.body.From;
	const body = req.body.Body?.trim();

	let session = await SessionModel.findOne({ user: from });

	if (!session) {
		session = await SessionModel.create({ user: from, step: 'menu' });
		await twilioClient.messages.create({
			from: process.env.TWILIO_PHONE_NUMBER!,
			to: from,
			body: getMenuMessage(),
		});
		return res.status(200).end();
	}

	if (session.step === 'menu') {
		switch (body) {
			case '1':
				session.step = 'quote';
				await session.save();
				return twilioClient.messages
					.create({
						from: process.env.TWILIO_PHONE_NUMBER!,
						to: from,
						body: 'Por favor, escribe los detalles para cotizar.',
					})
					.then(() => res.status(200).end());

			case '2':
				const agent = await AgentModel.findOne({
					active: true,
					attending: false,
				});
				if (!agent) {
					return twilioClient.messages
						.create({
							from: process.env.TWILIO_PHONE_NUMBER!,
							to: from,
							body: 'No hay agentes disponibles en este momento.',
						})
						.then(() => res.status(200).end());
				}
				session.step = 'agent';
				session.agent = agent._id;
				agent.attending = true;
				await agent.save();
				await session.save();
				return twilioClient.messages
					.create({
						from: process.env.TWILIO_PHONE_NUMBER!,
						to: from,
						body: `Te estamos conectando con ${agent.name}.`,
					})
					.then(() => res.status(200).end());

			default:
				return twilioClient.messages
					.create({
						from: process.env.TWILIO_PHONE_NUMBER!,
						to: from,
						body: 'Opción inválida. Por favor escribe 1 o 2.',
					})
					.then(() => res.status(200).end());
		}
	}

	// Paso adicional si ya está en conversación
	return res.status(200).end();
}
