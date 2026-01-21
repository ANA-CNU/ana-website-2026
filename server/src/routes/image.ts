import { Router } from 'express';
import multer from 'multer'
import randomid from '../Utils/randomid';
import path from 'path';
import { ExpressError } from '../Utils/ExpressError';
import { authJwt } from './auth';
import Image from '../models/Image';
import { TokenUser } from '../types/jwt';
import User, { IUser } from '../models/User';

const router = Router();

const imagesRoot = path.join(__dirname, '../../images');
export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, imagesRoot);
        },
        filename: (req, file, callback) => {
            const ext = path.extname(file.originalname);
            callback(null, `${randomid()}${ext}`);
        }
    }),
    fileFilter: (req, file, callback) => {
        const allowed: Array<string> = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
        if (allowed.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new ExpressError(400, '이미지 파일(jpg, jpeg, png, gif, webp)만 업로드 가능합니다.'));
        }
    }
})

router.post('/', authJwt, upload.single('image'), async (req, res) => {
    if (!req.file) throw new ExpressError(500, '이거 왜 오류나냐;;');
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    const image = new Image({
        name: req.file.filename,
        user: user
    });
    await image.save();

    res.json({ success: true, image: image });
})



export default router;