import mongoose, { Schema } from 'mongoose';

const AgentSchema = new Schema({
	name: String,
	active: Boolean,
	attending: Boolean,
});

export const AgentModel =
	mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
