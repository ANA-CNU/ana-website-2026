import React, { useState, useEffect } from 'react'
import api from '../../lib/axios';
import { Link } from 'react-router';

interface Post {
    urlid: string;
    title: string;
    createdAt?: string;
}

interface BoardResponse {
    success: boolean;
    posts: Post[];
}

interface CnuNotice {
    id: string;
    title: string;
    writer: string;
    created_at: string;
}

interface CnuNoticeResponse {
    success: boolean;
    posts: CnuNotice[];
}

const MiniBoard: React.FC<{ title: string, category: string }> = ({ title, category }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let res;
                if (category === 'cnunotice') {
                    res = await api.get<CnuNoticeResponse>('/api/board/posts/cnunotice', {
                        params: { page: 1 }
                    });

                    setPosts(res.data.posts.slice(0, 4).map((e) => ({
                        urlid: e.id,
                        title: e.title,
                        createdAt: e.created_at
                    })));
                } else {
                    res = await api.get<BoardResponse>('/api/board/posts', {
                        params: { category, page: 1 }
                    });

                    setPosts(res.data.posts.slice(0, 4));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [category]);

    const isNew = (dateString?: string) => {
        if (!dateString) return false;
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    return (
        <div className="card bg-base-100 shadow-md h-full overflow-hidden border border-base-200">

            <div className="bg-primary px-5 py-2 flex justify-between items-center">
                <h3 className="font-bold text-primary-content text-lg flex items-center gap-2">
                    {title}
                </h3>
                <Link to={`/board/${category}`} className="text-xs text-primary-content/80 hover:text-white hover:underline">
                    더보기 +
                </Link>
            </div>

            {loading ? (
                <div className='card-body p-4 h-30 skeleton'></div>
            ) : (
                <div className="card-body p-4">
                    <ul className="text-sm space-y-3">
                        {posts.length === 0 ? (
                            <li className="text-center text-gray-400 py-4">게시글이 없습니다.</li>
                        ) : (
                            posts.map((post) => (
                                <li key={post.urlid} className="flex justify-between items-center cursor-pointer hover:text-primary group border-b border-base-100 last:border-0 pb-2 last:pb-0">
                                    <Link to={`/board/${category === 'cnunotice' ? 'cnunotice/' : ''}${post.urlid}`} className="truncate w-3/4 text-gray-600 group-hover:text-primary flex items-center gap-2">
                                        {isNew(post.createdAt) && <span className="badge badge-error badge-xs text-white">N</span>}
                                        {post.title}
                                    </Link>
                                    <span className="text-gray-400 text-xs">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) : ''}
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
}

export default MiniBoard