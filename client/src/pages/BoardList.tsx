import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Link, useSearchParams } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

interface Author {
    _id: string;
    name: string;
    userid: string;
}

interface Post {
    urlid: string;
    title: string;
    category: string;
    author: Author;
    createdAt: string;
}

interface BoardListResponse {
    success: boolean;
    posts: Post[];
    totalPage: number;
}

interface BoardListProps {
    category: 'notice' | 'free' | 'algorithm' | 'csenotice';
}

const BoardList: React.FC<BoardListProps> = ({ category }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const res = await axios.get<BoardListResponse>(`/api/board/posts`, {
                    params: { category, page }
                });
                if (res.data.success) {
                    const posts = res.data.posts.map((e) => ({
                        ...e,
                        title: DOMPurify.sanitize(e.title)
                    }))
                    setPosts(posts);
                    setTotalPage(res.data.totalPage);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [category, page]);

    const categoryName = {
        'notice': '공지사항',
        'free': '자유게시판',
        'algorithm': '알고리즘 꿀팁',
        'csenotice': '학과 공지'
    }[category];

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
                {user && (
                    user.admin ||
                    (user.member && category === 'free')
                ) && (
                        <Link to="/board/write" className="btn btn-primary btn-sm">글쓰기</Link>
                    )}
            </div>

            <div className="overflow-x-auto bg-base-100 shadow-md">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th className="w-16 text-center">번호</th>
                            <th>제목</th>
                            <th className="w-32 text-center">작성자</th>
                            {/* <th className="w-32 text-center">날짜</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={3} className="text-center py-10">로딩 중...</td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan={3} className="text-center py-10">게시글이 없습니다.</td>
                            </tr>
                        ) : (
                            posts.map((post, index) => (
                                <tr key={post.urlid} className="hover">
                                    <td className="text-center">{(page - 1) * 20 + index + 1}</td>
                                    <td>
                                        <Link to={`/board/${category}/${post.urlid}`} className="hover:underline font-medium">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="text-center opacity-70">{post.author?.name || '익명'}</td>
                                    {/* <td className="text-center text-sm opacity-60">-</td> */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination settings */}
            <div className="flex justify-center mt-8 join">
                {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                    <Link
                        key={p}
                        to={`/board/${category}?page=${p}`}
                        className={`join-item btn ${p === page ? 'btn-active' : ''}`}
                    >
                        {p}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BoardList;
