import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IPost } from './Post';

export interface IComment extends Document {
    content: string,
    author: IUser | mongoose.Types.ObjectId,
    post: IPost | mongoose.Types.ObjectId
}

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    }, 
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }, 
    post: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Post'
    }
}, {
    timestamps: true
});

CommentSchema.index({ post: 1, createdAt: -1 });

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;