import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';

const Navbar: React.FC = () => {
    const { isLogin, user, logout } = useAuthStore();

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `whitespace-nowrap px-4 py-2 transition-colors ${isActive
            ? 'bg-white text-primary font-bold shadow-md'
            : 'hover:bg-white/10 text-primary-content'
        }`;

    return <header className="bg-primary text-primary-content shadow-md">
        <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center py-3 px-4">
                <Link to='/' className="flex flex-row items-end ml-2 font-mulmaru">
                    <span className="text-3xl font-extrabold tracking-tight leading-none">A N A</span>
                    <span className="text-xs opacity-80 font-light ml-2">Algorithm & Application</span>
                </Link>
                <div className="flex gap-4 text-sm font-medium mr-2 items-center">
                    {isLogin && user ? (
                        <>
                            <span className="opacity-90">{user.name}님</span>
                            <button onClick={logout} className="hover:text-white hover:underline opacity-90">로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-white hover:underline opacity-90">로그인</Link>
                        </>
                    )}
                </div>
            </div>
            <div className="border-t border-primary-content/20 mx-4"></div>
            <nav className="navbar min-h-12 px-2 py-2x">
                <ul className="menu menu-horizontal w-full justify-start gap-2 text-sm font-semibold">
                    <li className='tooltip tooltip-bottom tooltip-neutral'>
                        <div className='tooltip-content'>집</div>
                        <NavLink to="/" className={navLinkClass}>홈</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-top'>
                        <div className='tooltip-content text-md text-orange-300'><div className='animate-bounce -rotate-5 font-mulmaru translate-y-1'>*우리 ANA를 소개합니다~*</div></div>
                        <NavLink to="/about" className={navLinkClass}>ABOUT</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-bottom'>
                        <div className='tooltip-content'>재밌는건 다 여기에</div>
                        <NavLink to="/gallery" className={navLinkClass}>갤러리</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-bottom'>
                        <div className='tooltip-content'>중요한 동아리 정보를 볼 수 있어요</div>
                        <NavLink to="/board/notice" className={navLinkClass}>공지사항</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-bottom'>
                        <div className='tooltip-content'>컴퓨터인공지능학부 학과 공지</div>
                        <NavLink to="/board/cnunotice" className={navLinkClass}>학과공지</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-bottom'>
                        <div className='tooltip-content'>코딩 고수들의 비밀게시판</div>
                        <NavLink to="/board/algorithm" className={navLinkClass}>알고리즘 꿀팁</NavLink>
                    </li>
                    <li className='tooltip tooltip-neutral tooltip-bottom'>
                        <div className='tooltip-content'>질문, 자랑 등 다양하게 소통해요</div>
                        <NavLink to="/board/free" className={navLinkClass}>자유게시판</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        {(!isLogin || (user && !user.member && !user.admin)) && <Link to='https://forms.gle/8ooRgmh5UbdV7hQS9' className='bg-warning text-warning-content flex justify-center items-center h-5'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-3 opacity-70'><path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"></path></svg>
            <p className='text-xs font-mulmaru font-medium ml-1 opacity-70 hover:underline'>ANA 동아리에 가입하고 다양한 혜택을 누려보세요! (클릭)</p>
        </Link>}

    </header>
}

export default Navbar;