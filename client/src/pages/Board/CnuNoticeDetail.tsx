import React, { useEffect, useState, useRef } from 'react';
import api from '../../lib/axios';
import { useParams, useNavigate, Link } from 'react-router';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import useToastStore from '../../store/useToastStore';

interface Post {
    id: string;
    title: string;
    publish_date: string;
    writer: string;
    markdown_content: string;
    original_url: string;
    created_at: string;
}

interface Image {
    id: string;
    url: string;
    notice_id: string;
}

interface File {
    id: string;
    filename: string;
    url: string;
    notice_id: string;
    created_at: string;
}

interface PostDetailResponse {
    success: boolean;
    post: Post;
    images: Image[];
    files: File[];
}

const PostDetail: React.FC = () => {
    const { urlid } = useParams<{ urlid: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);
    const { showToast } = useToastStore();

    useEffect(() => {
        if (post && contentRef.current) {
            contentRef.current.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [post]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get<PostDetailResponse>(`/api/board/post/cnunotice/${urlid}`);

                const post = res.data.post;
                post.title = DOMPurify.sanitize(post.title);
                post.markdown_content = DOMPurify.sanitize(post.markdown_content);
                setPost(post);

                setImages(res.data.images);
                setFiles(res.data.files);
            } catch (err) {
                console.error(err);
                showToast('게시글을 불러오는데 실패했습니다.', 'error');
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [urlid, navigate]);

    if (loading) return <div className="text-center py-10">로딩 중...</div>;
    if (!post) return <div className="text-center py-10">게시글이 없습니다.</div>;

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="bg-base-100 shadow-md p-6 mb-8">
                <div className="border-b border-base-300 pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                        <span className="badge badge-primary badge-outline">cnunotice</span>
                        <div className="text-sm opacity-60">
                            {new Date(post.created_at).toLocaleDateString()}
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
                    <div className="text-sm font-medium opacity-70">작성자: {post.writer}</div>
                </div>

                <div className='prose max-w-none min-h-[200px] mb-8 ck-content'>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdown_content}</ReactMarkdown>
                </div>

                <div className="flex justify-end gap-2 border-t border-base-300 pt-4">
                    <Link to={`/board/cnunotice`} className="btn btn-ghost btn-sm">목록</Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
