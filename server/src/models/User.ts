import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document { // User 인터페이스
    name: string,
    userid: string,
    password?: string,
    googleid?: string, // 아니 물음표 있으면 값이 없어도 허용된다네요.. 문법 신기하네
    githubid?: string,
    admin: boolean,
    member: boolean
}

const UserSchema: Schema = new Schema({
    name: { // 이름
        type: String,
        required: true
    },
    userid: { // 학번
        type: String,
        unique: true,
        required: true
    },
    password: { // 비밀번호 (bcrypt로 암호화 함 걱정 ㄴㄴ, 소셜 회원가입 하면 비번 필요없으니까 required 비웠음)
        type: String,
    },
    googleid: { // 구글 연동 목적
        type: String,
        unique: true,
        sparse: true
    },
    githubid: { // 깃허브 연동 목적
        type: String,
        unique: true,
        sparse: true
    },
    admin: { // 관리자인지 여부
        type: Boolean,
        required: true,
        default: false
    },
    member: { // ANA 회원인지 여부
        type: Boolean,
        required: true,
        default: false
    }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;