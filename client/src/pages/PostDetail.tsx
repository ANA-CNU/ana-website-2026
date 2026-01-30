import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';

interface Author {
    _id: string;
    name: string;
    userid: string;
}

interface Comment {
    _id: string;
    content: string;
    author: Author;
    createdAt: string;
}

interface Post {
    urlid: string;
    title: string;
    content: string;
    category: string;
    author: Author;
    createdAt: string;
}

interface PostDetailResponse {
    success: boolean;
    post: Post;
    comments: Comment[];
}

const PostDetail: React.FC = () => {
    const { urlid, category } = useParams<{ urlid: string, category: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [post, setPost] = useState<Post | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (post && contentRef.current) {
            contentRef.current.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [post]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentContent, setCommentContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get<PostDetailResponse>(`/api/board/${category}/${urlid}`);
                if (res.data.success) {
                    const post = res.data.post;
                    post.title = DOMPurify.sanitize(post.title);
                    post.content = DOMPurify.sanitize(post.content);
                    
                    const comments = res.data.comments.map((com) => ({
                        ...com,
                        content: DOMPurify.sanitize(com.content)
                    }))
                    setPost(post);
                    setComments(comments);
                }
            } catch (err) {
                console.error(err);
                alert('게시글을 불러오는데 실패했습니다.');
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [urlid, navigate]);

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/board/post/${urlid}`);
            alert('삭제되었습니다.');
            navigate('/board/free'); // Default redirect to free board, logically should go back to list
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || '삭제 실패');
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentContent.trim()) return;
        setSubmitting(true);
        try {
            const res = await axios.post(`/api/board/comment/${urlid}`, { content: commentContent });
            if (res.data.success) {
                setCommentContent('');

                const refreshRes = await axios.get<PostDetailResponse>(`/api/board/post/${urlid}`);
                if (refreshRes.data.success) {
                    setComments(refreshRes.data.comments);
                }
            }
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || '댓글 작성 실패');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCommentDelete = async (commentId: string) => {
        if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/board/comment/${commentId}`);
            setComments(comments.filter(c => c._id !== commentId));
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || '댓글 삭제 실패');
        }
    }

    if (loading) return <div className="text-center py-10">로딩 중...</div>;
    if (!post) return <div className="text-center py-10">게시글이 없습니다.</div>;

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="bg-base-100 shadow-md p-6 mb-8">
                <div className="border-b border-base-300 pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="badge badge-primary badge-outline">{post.category}</span>
                        <div className="text-sm opacity-60">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                    <div className="text-sm font-medium opacity-70">작성자: {post.author.name}</div>
                </div>

                <div
                    ref={contentRef}
                    className="prose max-w-none min-h-[200px] mb-8 ck-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                >
                </div>

                <div className="flex justify-end gap-2 border-t border-base-300 pt-4">
                    <Link to={`/board/${post.category}`} className="btn btn-ghost btn-sm">목록</Link>
                    {user && (user.admin || user.userid === post.author?.userid) && (
                        <>
                            <Link to={`/board/edit/${post.urlid}`} className="btn btn-outline btn-sm">수정</Link>
                            <button onClick={handleDelete} className="btn btn-error btn-outline btn-sm">삭제</button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-base-100 shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">댓글 ({comments.length})</h3>

                <form onSubmit={handleCommentSubmit} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="댓글을 작성하세요..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={submitting}>등록</button>
                </form>

                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment._id} className="border-b border-base-200 pb-2 last:border-0">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-sm">{comment.author?.name || '알 수 없음'}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs opacity-50">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    <button onClick={() => handleCommentDelete(comment._id)} className="text-xs text-error hover:underline">삭제</button>
                                </div>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
