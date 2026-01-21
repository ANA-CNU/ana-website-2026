import { Router } from 'express';
import Post, { IPost } from '../models/Post';
import Comment, { IComment } from '../models/Comment';
import { ExpressError } from '../Utils/ExpressError';
import randomid from '../Utils/randomid';
import { authJwt } from './auth';
import { TokenUser } from '../types/jwt';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

const router = Router();


router.get('/posts', async (req, res) => {
    const page = Number(req.query.page || 1);
    const category = req.query.category || 'free';
    
    const posts = (await Post.find({ category: category }).sort({ createdAt: -1 }).skip(20 * (page-1)).limit(20).populate('author', 'name userid'))
        .map(e => { return { urlid: e.urlid, title: e.title, category: e.category, content: e.content, author: e.author } });
    const totalPost = await Post.countDocuments({ category: category });
    const totalPage = Math.ceil(totalPost / 20);
    res.json({ success: true, posts: posts, totalPage: totalPage });
})

router.get('/post/:urlid', async (req, res) => {
    const urlid = req.params.urlid;
    const post = await Post.findOne({ urlid: urlid }).populate('author', 'name userid');
    if (!post) throw new ExpressError(404, '게시글이 존재하지 않습니다.');
    
    const comments = await Comment.find({ post: post._id }).sort({ createdAt: -1 }).populate('author', 'name userid');
    res.json({ success: true, post: post, comments: comments });
})

router.post('/post', authJwt, async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) throw new ExpressError(400, '입력 값이 필요합니다.');

    if (!['notice', 'free', 'algorithm', 'csenotice'].includes(category)) throw new ExpressError(400, '존재하지 않는 카테고리입니다.');
    
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;

    if (!user.member) throw new ExpressError(401, '아나 회원이어야 합니다.');
    if (!user.admin && ['notice', 'algorithm', 'csenotice'].includes(category)) throw new ExpressError(401, '관리자 권한이 없습니다.');

    const post: IPost = new Post({
        title: title,
        content: content,
        category: category,
        author: user, 
        urlid: randomid()
    })
    await post.save();

    res.json({ success: true, post: post });
}) 

router.patch('/post/:urlid', authJwt, async (req, res) => {
    const urlid = req.params.urlid;
    const post = await Post.findOne({ urlid: urlid });
    if (!post) throw new ExpressError(404, '게시글을 찾을 수 없습니다.');

    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    const compareUser = user._id.equals(post.author as mongoose.Types.ObjectId);
    if (!user.admin && !compareUser) throw new ExpressError(401, '권한이 없습니다.');

    const { title, content } = req.body;
    if (!title || !content) throw new ExpressError(400, '입력 값이 필요합니다.');

    post.title = title;
    post.content = content;
    await post.save();
    
    res.json({ success: true, post: post });
})

router.delete('/post/:urlid', authJwt, async (req, res) => {
    const urlid = req.params.urlid;
    const post = await Post.findOne({ urlid: urlid });
    if (!post) throw new ExpressError(404, '게시글을 찾을 수 없습니다.');

    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    const compareUser = user._id.equals(post.author as mongoose.Types.ObjectId);
    if (!user.admin && !compareUser) throw new ExpressError(401, '권한이 없습니다.');

    await post.deleteOne();

    res.json({ success: true });
})

router.post('/comment/:urlid', authJwt, async (req, res) => {
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    if (!user.member) throw new ExpressError(401, '아나 회원이어야 합니다.');
    
    const urlid = req.params.urlid;
    const post = await Post.findOne({ urlid: urlid });
    if (!post) throw new ExpressError(404, '게시글을 찾을 수 없습니다.');
    
    const content = req.body.content;
    if (!content) throw new ExpressError(400, '입력값이 필요합니다.');
    
    const comment = new Comment({
        content: content,
        author: user,
        post: post
    })
    await comment.save();

    res.json({ success: true, comment: comment });
})

router.delete('/comment/:id', authJwt, async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findById(id).populate('author');
    if (!comment) throw new ExpressError(404, '댓글이 존재하지 않습니다.');
    
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    
    const isAuthor = user._id.equals(comment.author as mongoose.Types.ObjectId);
    if (!user.admin && !isAuthor) throw new ExpressError(401, '권한이 없습니다.');

    await comment.deleteOne();
    res.json({ success: true });
})


export default router