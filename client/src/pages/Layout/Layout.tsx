import { Suspense } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';


const Layout: React.FC = () => {
    return (
        <>
            <div className='min-h-screen bg-base-200 font-pretendard flex flex-col'>
                <Navbar />
                <Suspense fallback={null}>
                    <div className="flex-grow pb-10">
                        <Outlet />
                    </div>
                </Suspense>
                <Footer />
            </div>
        </>
    )
}

export default Layout;