import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IImage extends Document {
    name: string,
    user: mongoose.Types.ObjectId | IUser
}

const ImageSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    user: { // 업로드한 유저
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Image = mongoose.model<IImage>('Image', ImageSchema);
export default Image;