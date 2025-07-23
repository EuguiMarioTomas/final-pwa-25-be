import { Schema, model, Document, Types} from 'mongoose';


export interface IReminder extends Document{
  title: string;
  description: string;
  type: 'Pendiente' |'Evento' | 'Idea' | 'Otro';
  createdAt: Date;
  updatedAt: Date;
  author: Types.ObjectId;
  sharedWith?: Types.ObjectId[];
  isArchived?: boolean;
  dueDate?: Date | null;
}

const reminderSchema = new Schema<IReminder>({
  title: {type: String, required: true, trim: true},
  description: {type: String, required: true, trim: true},
  type: {type: String, enum:['Pendiente', 'Evento', 'Idea', 'Otro'], default: 'Otro'},
  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  sharedWith: [{type: Schema.Types.ObjectId, ref: 'User'}],
  isArchived: {type: Boolean, default: false},
  dueDate: {type: Date, default: null},
  
},{
  timestamps: true,
});

const Reminder = model<IReminder>('Reminder', reminderSchema);
export default Reminder;