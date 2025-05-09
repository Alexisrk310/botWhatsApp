export function buildTwilioResponse(reply: string): string {
	return `
    <Response>
      <Message>${reply}</Message>
    </Response>
  `;
}
