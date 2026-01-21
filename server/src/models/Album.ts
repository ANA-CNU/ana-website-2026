import mongoose, { Schema, Document } from "mongoose";
import Image, { IImage } from "./Image";
import { IUser } from "./User";

export interface IAlbum extends Document {
    images: mongoose.Types.ObjectId[] | IImage[],
    content: string,
    author: mongoose.Types.ObjectId | IUser,
    urlid: string
}

const AlbumSchema = new Schema({
    images: [
        {
            type: Schema.ObjectId,
            required: true,
            ref: 'Image'
        }
    ],
    content: {
        type: String
    },
    author: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    }, 
    urlid: {
        type: String,
        required: true,
        index: true
    }
}, {
    timestamps: true
})

AlbumSchema.index({ createdAt: -1 });

const Album = mongoose.model<IAlbum>('Album', AlbumSchema);
export default Album;