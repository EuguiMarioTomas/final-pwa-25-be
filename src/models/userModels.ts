import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document{
  userName: string;
  email: string;
  createdAt: Date;
  isActive?: boolean;
  firebaseUid: string;
};

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true, trim: true},
  email: { type: String, required: true, unique: true, trim: true},
  createdAt: { type: Date, default:Date.now},
  isActive: { type: Boolean, default: true},
  firebaseUid: { type: String, required: true, unique: true, trim: true}
});

const User = model<IUser>('User', userSchema);

export default User;