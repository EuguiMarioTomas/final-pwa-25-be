import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document{
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  isActive?: boolean;
};

const userSchema = new Schema<IUser>({
  userName: { type: String, rquired: true, trim: true},
  email: { type: String, required: true, unique: true, trim: true},
  password: { type: String, required: true, trim: true},
  createdAt: { type: Date, default:Date.now},
  isActive: { type: Boolean, default: true},
});

const User = model<IUser>('User', userSchema);

export default User;