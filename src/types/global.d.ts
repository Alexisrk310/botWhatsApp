import mongoose from 'mongoose';

// types/global.d.ts
declare global {
	namespace NodeJS {
		interface Global {
			mongoose: {
				conn: mongoose.Connection | null;
				promise: Promise<mongoose.Connection> | null;
			};
		}
	}
}

export {};
