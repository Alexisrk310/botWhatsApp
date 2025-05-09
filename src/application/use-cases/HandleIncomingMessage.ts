export function handleIncomingMessage(message: string): string {
	const cleanedMessage = message.toLowerCase().trim();

	// Aquí defines las respuestas según el mensaje entrante
	switch (cleanedMessage) {
		case 'cotizar':
			return '¡Claro! Por favor envíanos los detalles de lo que deseas cotizar.';
		case 'saber más de nosotros':
			return 'Somos una empresa dedicada a proporcionar soluciones logísticas innovadoras.';
		case 'ver pagina web':
			return 'Puedes ver nuestra página web en: https://www.nuestraempresa.com';
		case 'hablar con un asesor':
			return 'Un asesor te contactará pronto. Gracias por tu paciencia.';
		default:
			return 'Lo siento, no entendí tu mensaje. Puedes escribir "Cotizar", "Saber más de nosotros", "Ver página web" o "Hablar con un asesor".';
	}
}
