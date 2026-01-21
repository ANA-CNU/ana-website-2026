import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';
const router = Router();

import authRouter from './auth';
import imageRouter from './image';
import boardRouter from './board';
import galleryRouter from './gallery';


router.use('/auth', authRouter);
router.use('/image', imageRouter);
router.use('/board', boardRouter);
router.use('/gallery', galleryRouter);

const imagesRoot = path.join(__dirname, '../../images');
try {
	fs.readdirSync(imagesRoot);
} catch(err) {
	console.error('images 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync(imagesRoot); 
}
router.use('/images', express.static(imagesRoot));


export default router;