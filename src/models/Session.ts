import mongoose, { Schema } from 'mongoose';

const SessionSchema = new Schema({
	user: String,
	step: String,
	agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
});

export const SessionModel =
	mongoose.models.Session || mongoose.model('Session', SessionSchema);
