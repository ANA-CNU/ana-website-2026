import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document { // Member 인터페이스
    name: string,
    userid: string,
    number: string,
    email?: string
}

const MemberSchema: Schema = new Schema({
    name: { // 이름
        type: String,
        required: true
    },
    userid: { // 학번
        type: String,
        unique: true,
        required: true
    },
    number: { // 전화번호
        type: String,
        required: true
    },
    email: { // 이메일
        type: String
    }
});

const Member = mongoose.model<IMember>('Member', MemberSchema);

export default Member;