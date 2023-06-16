import mongoose,{Model, Schema} from 'mongoose';
import { Entry } from '@/interfaces';

export interface IEntry extends Entry{

}


const userSchema = new Schema({
    description: {type: String, required: true },
    createdAt: {type: Number},
    status: {
        type: String,
        enum: {
            values: ['pending','in-progress','finished'],
            message: '{VALUE} no es un estado permitido por {VALUE}'
        }  ,
        default: 'pending', requireed: true
    }
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', userSchema);

export default EntryModel;
