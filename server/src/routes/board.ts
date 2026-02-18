// sanitize 안한 이유: 서버에 부하가 큼. 그리고 프론트에서 하면 됨. 
import { Router } from 'express';
import Post, { IPost } from '../models/Post';
import Comment, { IComment } from '../models/Comment';
import { ExpressError } from '../Utils/ExpressError';
import randomid from '../Utils/randomid';
import { authJwt } from './auth';
import { TokenUser } from '../types/jwt';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';
import { createClient } from '@supabase/supabase-js';
import telegramMessage from '../Utils/telegramMessage';

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string);
const router = Router();


// ========== 게시글 ==========

// 일반 게시글 R
router.get('/posts', async (req, res) => {
    const page = Number(req.query.page || 1);
    const category = (req.query.category as string) || 'free';

    if (!['free', 'notice', 'algorithm'].includes(category)) throw new ExpressError(404, '그런 카테고리 없습니다');

    const posts = (await Post.find({ category: category }).sort({ createdAt: -1 }).skip(20 * (page - 1)).limit(20).populate('author', 'name userid'))
        .map(e => { return { urlid: e.urlid, title: e.title, category: e.category, author: e.author, createdAt: e.createdAt } }) as IPost[];

    const totalPost = await Post.countDocuments({ category: category });
    const totalPage = Math.ceil(totalPost / 20);


    res.json({ success: true, posts: posts, totalPage: totalPage });
})

router.get('/post/:urlid', async (req, res) => {
    const urlid = req.params.urlid;

    const post = await Post.findOne({ urlid: urlid }).populate('author', 'name userid');
    if (!post) throw new ExpressError(404, '그런 게시물 없습니다..');
    const comments = await Comment.find({ post: post._id }).sort({ createdAt: -1 }).populate('author', 'name userid');

    res.json({ success: true, post: post, comments: comments });
})

// 학과 공지 게시글 R
router.get('/posts/cnunotice', async (req, res) => {
    const page = Number(req.query.page || 1);

    const { data, count, error } = await supabase.from('notice')
        .select('id, title, writer, created_at', { count: 'exact' })
        .eq('ignore_flag', false)
        .order('publish_date', { ascending: false })
        .order('id', { ascending: false })
        .range(20 * (page - 1), 20 * page - 1);

    if (error) throw error;

    const totalPage = Math.ceil((count || 20) / 20);

    res.json({ success: true, posts: data, totalPage: totalPage });
})

router.get('/post/cnunotice/:urlid', async (req, res) => {
    const urlid = req.params.urlid;

    const { data, error } = await supabase.from('notice')
        .select('id, title, publish_date, writer, markdown_content, original_url, created_at, updated_at')
        .eq('id', urlid).eq('ignore_flag', 'false');
    if (error) throw error;
    if (data.length == 0) throw new ExpressError(404, '그런 게시글 없습니다');

    res.json({ success: true, post: data[0] });
})

// 일반 게시글 CUD
router.post('/post', authJwt, async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) throw new ExpressError(400, '입력 값이 필요합니다.');

    if (!['notice', 'free', 'algorithm'].includes(category)) throw new ExpressError(400, '존재하지 않는 카테고리입니다.');

    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;

    if (!user.member && !user.admin) throw new ExpressError(401, 'ANA 동아리 회원이어야 합니다.');
    if (!user.admin && ['notice'].includes(category)) throw new ExpressError(401, '관리자 권한이 없습니다.');

    const post: IPost = new Post({
        title: title,
        content: content,
        category: category,
        author: user,
        urlid: randomid()
    })
    await post.save();
    telegramMessage(`*게시판에 글이 올라왔습니다!*\n\n작성한 유저: ${user.userid} ${user.name}\n카테고리: ${category}\n${user.name}\n글 제목: ${title}\n\n[당장 구경가기](${process.env.CLIENT_URL}/board/${post.urlid})`);

    res.json({ success: true, post: post });
})

router.patch('/post/:urlid', authJwt, async (req, res) => {
    const urlid = req.params.urlid;
    const post = await Post.findOne({ urlid: urlid });
    if (!post) throw new ExpressError(404, '게시글을 찾을 수 없습니다.');

    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    const compareUser = user._id.equals(post.author as mongoose.Types.ObjectId); // 게시글 유저랑 로그인된 유저 비교
    if (!compareUser) throw new ExpressError(401, '본인이 아닙니다.');

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


// ========== 댓글 ==========

// 일반 댓글 CD
router.post('/comment/:urlid', authJwt, async (req, res) => {
    const tokenUser = req.user as TokenUser;
    const user = await User.findOne({ userid: tokenUser.userid }) as IUser;
    if (!user.member && !user.admin) throw new ExpressError(401, '아나 회원이어야 합니다.');

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