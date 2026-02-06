import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

interface Banner { imageUrl: string; title: string; description: string; linkUrl: string; }
interface Information { label: string; value: string; }
interface TodayProblem { tier: string; title: string; linkUrl: string }

interface SiteConfig { isDefault: boolean; banner: Banner; information: Information[]; todayProblem: TodayProblem }

interface SiteConfigResponse {
    success: boolean;
    siteConfig: SiteConfig;
}

const Home: React.FC = () => {
    const [banner, setBanner] = useState<Banner | null>(null);
    const [information, setInformation] = useState<Information[]>([]);
    const [todayProblem, setTodayProblem] = useState<TodayProblem | null>(null);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSiteConfig = async () => {
            try {
                const res = await axios.get<SiteConfigResponse>('api/siteConfig/');

                const siteConfig = res.data.siteConfig;
                setBanner(siteConfig.banner);
                setInformation(siteConfig.information);
                setTodayProblem(siteConfig.todayProblem);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        getSiteConfig();
    }, [])


    return (
        <main className="container mx-auto max-w-6xl p-4 space-y-5">

            {/* ========== Banner ========== */}
            <div className="card lg:card-side bg-base-100 shadow-md">
                {loading ? (
                    <figure className=" skeleton lg:w-2/3 bg-gray-300 min-h-[240px] aspect-[2/1]" />
                ) : (
                    <figure className="lg:w-2/3 bg-gray-300 min-h-[240px] aspect-[2/1]">
                        <img src={banner?.imageUrl} alt="Banner" className="w-full h-full object-cover" />
                    </figure>
                )}

                {loading ? (
                    <div className="card-body lg:w-1/3 justify-center">
                        <h2 className="card-title font-bold skeleton skeleton-text">Loading</h2>
                        <p className="text-sm skeleton skeleton-text">Loading</p>
                        <div className="card-actions justify-end mt-2">
                            <button className='btn btn-primary btn-sm btn-disabled'><span className="loading loading-spinner loading-md"></span></button>
                        </div>
                    </div>
                ) : (
                    <div className="card-body lg:w-1/3 justify-center">
                        <h2 className="card-title font-bold">{banner?.title}</h2>
                        <p className="text-sm text-gray-500">{banner?.description}</p>
                        <div className="card-actions justify-end mt-2">
                            <Link to={banner ? banner.linkUrl : ''} className='btn btn-primary btn-sm'>자세히 보기</Link>
                        </div>
                    </div>
                )}
            </div>

            {/* ========== Information ========== */}
            <div className="w-full bg-base-100 shadow-md border border-base-200">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-base-200">
                    {information.map((info, idx) => (
                        <div key={idx} className="p-4 flex flex-col items-center justify-center">
                            <div className="text-xs text-gray-500 mb-1">{info.label}</div>
                            <div className="text-2xl font-bold text-primary">{info.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========== Link ========== */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[{
                    name: '아나 동아리 가입', url: 'https://www.naver.com', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                },
                {
                    name: '공지사항', url: '/board/notice', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                },
                {
                    name: 'ANA Online Judge', url: 'https://aoj.anacnu.kr', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                    </svg>
                },
                {
                    name: 'ANABADA', url: 'https://bada.anacnu.kr/', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                },
                {
                    name: 'solved.ac', url: 'https://solved.ac/', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                },
                {
                    name: '백준', url: '', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-none stroke-current stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                    </svg>
                }].map((item) => (
                    <Link to={item.url} key={item.name} className="btn btn-outline bg-base-100 border-gray-200 text-gray-600 hover:bg-primary hover:border-primary hover:text-white h-20 flex-col gap-1 shadow-sm">
                        <span className="text-xl">{item.svg}</span>
                        <span className="text-xs font-normal">{item.name}</span>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

                {/* ========== Board ========== */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Board title="공지사항" category="notice" />
                    <Board title="학과 공지" category="cnunotice" />
                    <Board title="알고리즘 꿀팁" category="algorithm" />
                    <Board title="자유게시판" category="free" />
                </div>

                {/* ========== Etc ========== */}
                <div className="space-y-5 h-fit lg:col-span-1">

                    <div className="card bg-base-100 shadow-md p-4 h-fit">
                        <h3 className="font-bold text-gray-700 mb-2 border-b pb-2 text-sm">회원 현황</h3>
                        <div className="flex justify-between text-center text-sm">
                            <div><div className="font-bold text-lg">48</div><span className="text-xs text-gray-400">전체</span></div>
                            <div><div className="font-bold text-lg text-blue-500">32</div><span className="text-xs text-gray-400">활동</span></div>
                            <div><div className="font-bold text-lg text-red-500">+5</div><span className="text-xs text-gray-400">신규</span></div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-md h-fit overflow-hidden">
                        <div className="bg-success text-success-content p-2 px-4 text-sm font-bold">
                            오늘의 문제
                        </div>
                        {loading ? (
                            <div className="p-4 text-sm">
                                <span className="badge badge-outline badge-sm mb-1 skeleton skeleton-text">Loading</span>
                                <p className="font-bold truncate skeleton skeleton-text">Loading</p>
                                <button className='btn btn-primary btn-block btn-sm btn-disabled'><span className="loading loading-spinner loading-sm"></span></button>
                            </div>
                        ) : (
                            <div className="p-4 text-sm">
                                <span className="badge badge-outline badge-sm mb-1">{todayProblem ? todayProblem.tier : '로딩 중 ㅅㅂ'}</span>
                                <p className="font-bold truncate">{todayProblem ? todayProblem.title : '로딩 중 ㅅㅂ'}</p>
                                <Link to={todayProblem ? todayProblem.linkUrl : ''} className='btn btn-primary btn-block btn-sm mt-3'>도전하기</Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </main>

    );
};

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

const Board: React.FC<{ title: string, category: string }> = ({ title, category }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let res;
                if (category === 'cnunotice') {
                    res = await axios.get<CnuNoticeResponse>('/api/board/posts/cnunotice', {
                        params: { page: 1 }
                    });

                    setPosts(res.data.posts.slice(0, 4).map((e) => ({
                        urlid: e.id,
                        title: e.title,
                        createdAt: e.created_at
                    })));
                } else {
                    res = await axios.get<BoardResponse>('/api/board/posts', {
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
        <div className="card bg-base-100 shadow-md h-full min-h-[220px] overflow-hidden border border-base-200">
            <div className="bg-primary px-5 py-2 flex justify-between items-center">
                <h3 className="font-bold text-primary-content text-lg flex items-center gap-2">
                    {title}
                </h3>
                <Link to={`/board/${category}`} className="text-xs text-primary-content/80 hover:text-white hover:underline">
                    더보기 +
                </Link>
            </div>
            {loading ? (
                <div className='card-body p-4 pt-4 skeleton'></div>
            ) : (
                <div className="card-body p-4 pt-4">
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

export default Home;