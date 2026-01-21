import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
    title: string,
    content: string,
    author: IUser | mongoose.Types.ObjectId,
    category: 'notice' | 'free' | 'algorithm' | 'csenotice',
    urlid: string
}

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    }, 
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }, 
    category: {
        type: String,
        enum: ['notice', 'free', 'algorithm', 'csenotice']
    }, 
    urlid: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true
});

PostSchema.index({ category: 1, createdAt: -1 });

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;