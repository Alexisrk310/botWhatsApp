import mongoose, { Connection } from 'mongoose';

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect(): Promise<Connection> {
	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		cached.promise = mongoose.connect(process.env.MONGODB_URI!, {
			dbName: 'Cluster0',
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
