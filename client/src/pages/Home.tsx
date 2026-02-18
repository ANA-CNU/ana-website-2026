import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Link } from 'react-router';

interface Banner { imageUrl: string; title: string; description: string; linkUrl: string; }
interface Information { label: string; value: string; }
interface TodayProblem { tier: string; title: string; linkUrl: string }

interface SiteConfig { isDefault: boolean; banner: Banner; information: Information[]; todayProblem: TodayProblem[] }

interface SiteConfigResponse {
    success: boolean;
    siteConfig: SiteConfig;
}

const Home: React.FC = () => {
    const [banner, setBanner] = useState<Banner | null>(null);
    const [information, setInformation] = useState<Information[]>([]);
    const [todayProblem, setTodayProblem] = useState<TodayProblem[]>([]);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSiteConfig = async () => {
            try {
                const res = await api.get<SiteConfigResponse>('/api/siteConfig/');

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
                    <figure className=" skeleton lg:w-2/3 bg-gray-300 min-h-[240px] aspect-[2/1] min-w-0" />
                ) : (
                    <figure className="lg:w-2/3 bg-gray-300 min-h-[240px] aspect-[2/1] min-w-0">
                        <img src={banner?.imageUrl} alt="Banner" className="w-full h-full object-cover" />
                    </figure>
                )}

                {loading ? (
                    <div className="card-body lg:w-1/3 justify-center">
                        <h2 className="card-title font-extrabold skeleton skeleton-text">Loading</h2>
                        <p className="text-sm skeleton skeleton-text">Loading</p>
                        <div className="card-actions justify-end mt-2">
                            <button className='btn btn-primary btn-sm btn-disabled'><span className="loading loading-spinner loading-md"></span></button>
                        </div>
                    </div>
                ) : (
                    <div className="card-body lg:w-1/3 justify-center">
                        <h2 className="card-title font-extrabold">{banner?.title}</h2>
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
                    name: 'ANA 동아리 가입', url: 'https://forms.gle/8ooRgmh5UbdV7hQS9', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-7 fill-current'><path d="M21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4h6a1,1,0,0,0,0-2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM6,12.76V17a1,1,0,0,0,1,1h4.24a1,1,0,0,0,.71-.29l6.92-6.93h0L21.71,8a1,1,0,0,0,0-1.42L17.47,2.29a1,1,0,0,0-1.42,0L13.23,5.12h0L6.29,12.05A1,1,0,0,0,6,12.76ZM16.76,4.41l2.83,2.83L18.17,8.66,15.34,5.83ZM8,13.17l5.93-5.93,2.83,2.83L10.83,16H8Z"></path></svg>
                },
                {
                    name: 'ANA 인스타그램', url: 'https://www.instagram.com/cnu_ana_official', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-7 fill-current"><path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg>

                },
                {
                    name: 'ANA Online Judge', url: 'https://aoj.anacnu.kr', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-7 fill-current'><path d="M6 6a2 2 0 0 1 2-2 1 1 0 0 0 0-2 4 4 0 0 0-4 4v3a2 2 0 0 1-2 2 1 1 0 0 0 0 2 2 2 0 0 1 2 2v3a4 4 0 0 0 4 4 1 1 0 0 0 0-2 2 2 0 0 1-2-2v-3a4 4 0 0 0-1.38-3A4 4 0 0 0 6 9Zm16 5a2 2 0 0 1-2-2V6a4 4 0 0 0-4-4 1 1 0 0 0 0 2 2 2 0 0 1 2 2v3a4 4 0 0 0 1.38 3A4 4 0 0 0 18 15v3a2 2 0 0 1-2 2 1 1 0 0 0 0 2 4 4 0 0 0 4-4v-3a2 2 0 0 1 2-2 1 1 0 0 0 0-2Z"></path></svg>
                },
                {
                    name: 'ANABADA', url: 'https://bada.anacnu.kr', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-7 fill-current'><path d="M12.3,12.22A4.92,4.92,0,0,0,14,8.5a5,5,0,0,0-10,0,4.92,4.92,0,0,0,1.7,3.72A8,8,0,0,0,1,19.5a1,1,0,0,0,2,0,6,6,0,0,1,12,0,1,1,0,0,0,2,0A8,8,0,0,0,12.3,12.22ZM9,11.5a3,3,0,1,1,3-3A3,3,0,0,1,9,11.5Zm9.74.32A5,5,0,0,0,15,3.5a1,1,0,0,0,0,2,3,3,0,0,1,3,3,3,3,0,0,1-1.5,2.59,1,1,0,0,0-.5.84,1,1,0,0,0,.45.86l.39.26.13.07a7,7,0,0,1,4,6.38,1,1,0,0,0,2,0A9,9,0,0,0,18.74,11.82Z"></path></svg>
                },
                {
                    name: 'solved.ac', url: 'https://solved.ac', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-7 fill-current'><path d="M21.3,10.08A3,3,0,0,0,19,9H14.44L15,7.57A4.13,4.13,0,0,0,11.11,2a1,1,0,0,0-.91.59L7.35,9H5a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17.73a3,3,0,0,0,2.95-2.46l1.27-7A3,3,0,0,0,21.3,10.08ZM7,20H5a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H7Zm13-7.82-1.27,7a1,1,0,0,1-1,.82H9V10.21l2.72-6.12A2.11,2.11,0,0,1,13.1,6.87L12.57,8.3A2,2,0,0,0,14.44,11H19a1,1,0,0,1,.77.36A1,1,0,0,1,20,12.18Z"></path></svg>
                },
                {
                    name: '백준', url: 'https://www.acmicpc.net', svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-7 fill-current'><path d="M9.71,6.29a1,1,0,0,0-1.42,0l-5,5a1,1,0,0,0,0,1.42l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L5.41,12l4.3-4.29A1,1,0,0,0,9.71,6.29Zm11,5-5-5a1,1,0,0,0-1.42,1.42L18.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5A1,1,0,0,0,20.71,11.29Z"></path></svg>
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

                    <div className="card bg-base-100 shadow-md h-fit overflow-hidden">
                        <div className="bg-success text-success-content p-2 px-4 text-sm font-bold">
                            오늘의 문제
                        </div>
                        <div className='divide-y-1 divide-base-200'>
                            {loading ? (
                                <div className="p-4 text-sm">
                                    <span className="badge badge-outline badge-sm mb-1 skeleton skeleton-text">Loading</span>
                                    <p className="font-bold truncate skeleton skeleton-text">Loading</p>
                                    <button className='btn btn-primary btn-block btn-sm btn-disabled'><span className="loading loading-spinner loading-sm"></span></button>
                                </div>
                            ) : (
                                todayProblem.map((problem, idx) => (
                                    <div className="p-4 text-sm" key={`problem_${idx}`}>
                                        <span className="badge badge-outline badge-sm mb-1">{problem.tier}</span>
                                        <p className="font-bold truncate">{problem.title}</p>
                                        <Link to={problem.linkUrl} className='btn btn-primary btn-block btn-sm mt-3'>도전하기</Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* 회원 현황 부분이었는데 굳이 없어도 될듯 */}
                    {/* <div className="card bg-base-100 shadow-md p-4 h-fit">
                        <h3 className="font-bold text-gray-700 mb-2 border-b pb-2 text-sm">회원 현황</h3>
                        <div className="flex justify-between text-center text-sm">
                            <div><div className="font-bold text-lg">48</div><span className="text-xs text-gray-400">전체</span></div>
                            <div><div className="font-bold text-lg text-blue-500">32</div><span className="text-xs text-gray-400">활동</span></div>
                            <div><div className="font-bold text-lg text-red-500">+5</div><span className="text-xs text-gray-400">신규</span></div>
                        </div>
                    </div> */}

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