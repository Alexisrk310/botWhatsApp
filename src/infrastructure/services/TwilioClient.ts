import twilio from 'twilio';

export const client = twilio(
	process.env.TWILIO_ACCOUNT_SID!,
	process.env.TWILIO_AUTH_TOKEN!
);

export async function sendMessage(to: string, body: string) {
	await client.messages.create({
		from: 'whatsapp:+14155238886',
		to,
		body,
	});
}
