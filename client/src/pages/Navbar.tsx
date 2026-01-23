import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

const Navbar: React.FC = () => {
    const { isLogin, user, logout } = useAuthStore();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `whitespace-nowrap px-4 py-2 transition-colors ${isActive
            ? 'bg-white text-primary font-bold shadow-md'
            : 'hover:bg-white/10 text-primary-content'
        }`;

    return <header className="bg-primary text-primary-content shadow-lg">
        <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center py-2 px-4">
                <div className="flex flex-row items-end">
                    <span className="text-3xl font-extrabold tracking-tight leading-none">ANA</span>
                    <span className="text-xs opacity-80 font-light ml-2">Algorithm & Application</span>
                </div>
                <div className="flex gap-4 text-sm font-medium">
                    {isLogin && user ? (
                        <>
                            <span className="opacity-90">{user.name}님</span>
                            <button onClick={logout} className="hover:text-white hover:underline opacity-90">로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-white hover:underline opacity-90">로그인</Link>
                            <Link to="/register" className="hover:text-white hover:underline opacity-90">회원가입</Link>
                        </>
                    )}
                </div>
            </div>
            <div className="border-t border-primary-content/20 mx-4"></div>
            <nav className="navbar min-h-12 px-2 py-2">
                <ul className="menu menu-horizontal w-full justify-start gap-2 text-sm font-semibold overflow-x-auto">
                    <li><NavLink to="/" className={navLinkClass}>홈</NavLink></li>
                    <li><NavLink to="/about" className={navLinkClass}>동아리소개</NavLink></li>
                    <li><NavLink to="/board/notice" className={navLinkClass}>공지사항</NavLink></li>
                    <li><NavLink to="/board/csenotice" className={navLinkClass}>학과공지</NavLink></li>
                    <li><NavLink to="/board/algorithm" className={navLinkClass}>알고리즘 꿀팁</NavLink></li>
                    <li><NavLink to="/board/free" className={navLinkClass}>자유게시판</NavLink></li>
                    <li><NavLink to="/gallery" className={navLinkClass}>갤러리</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
}

export default Navbar;