import bcrypt from 'bcrypt';
import User from '../models/User';

const adminConfig = async () => {
    const userid = process.env.ADMIN_ID as string;
    const password = process.env.ADMIN_PASSWORD as string;
    
    const user = await User.findOne({ userid: userid });
    if (!!user) { console.log('admin already exist'); return; }

    const bcryptPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: '관리자',
        userid: userid,
        password: bcryptPassword,
        admin: true,
        member: true
    })

    await newUser.save();
    console.log('admin make successful')
}

export default adminConfig;