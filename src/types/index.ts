export interface Session {
	user: string;
	step: string;
	agent?: string;
}

export interface Agent {
	name: string;
	active: boolean;
	attending: boolean;
}
