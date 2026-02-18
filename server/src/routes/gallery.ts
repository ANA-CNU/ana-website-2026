import { Router } from 'express';
import Post, { IPost } from '../models/Post';
import Comment, { IComment } from '../models/Comment';
import { ExpressError } from '../Utils/ExpressError';
import randomid from '../Utils/randomid';
import { authJwt } from './auth';
import { TokenUser } from '../types/jwt';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';
import Album, { IAlbum } from '../models/Album';
import { upload } from './image';
import Image, { IImage } from '../models/Image';
import telegramMessage from '../Utils/telegramMessage';

const router = Router();

router.get('/albums', async (req, res) => {
    const albums = await Album.find().sort({ createdAt: -1 }).populate('author', 'name userid').populate('images')
    res.json({ success: true, albums: albums });
})

router.get('/album/:urlid', async (req, res) => {
    const urlid = req.params.urlid;
    const album = await Album.findOne({ urlid: urlid }).populate('author', 'name userid').populate('images');
    if (!album) throw new ExpressError(404, '앨범이 존재하지 않습니다.');

    res.json({ success: true, album: album });
})

router.post('/album', authJwt, upload.array('images'), async (req, res) => {
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;

    if (!user.admin && !user.member) throw new ExpressError(401, '권한이 없습니다.');

    const files = req.files as Express.Multer.File[];
    if (files.length > 10) throw new ExpressError(400, '사진이 너무 많습니다. 10장 이하로 보내십쇼');
    const images = await Image.insertMany(files.map(e => ({
        name: e.filename,
        user: user
    })));

    const content = req.body.content;
    const urlid = randomid();

    const album = new Album({
        images: images,
        content: content,
        author: user,
        urlid: urlid
    })

    await album.save();

    telegramMessage(`*갤러리에 앨범이 올라왔습니다!*\n\n작성한 유저: ${user.userid} ${user.name}\n\n[당장 구경가기](${process.env.CLIENT_URL}/gallery/${album.urlid})`);
    res.json({ success: true, album: album });
})

router.delete('/album/:urlid', authJwt, async (req, res) => {
    const urlid = req.params.urlid;
    const album = await Album.findOne({ urlid: urlid }).populate('author', 'name userid').populate('images');
    if (!album) throw new ExpressError(404, '앨범이 존재하지 않습니다.');

    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;

    const isAuthor = user._id.equals(album.author as mongoose.Types.ObjectId);
    if (!user.admin && !isAuthor) throw new ExpressError(401, '권한이 없습니다.');
    
    await album.deleteOne();
    res.json({ success: true });
})




export default router;