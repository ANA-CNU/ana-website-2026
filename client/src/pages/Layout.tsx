import { Outlet } from 'react-router';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';


const Layout: React.FC = () => {
    return (
        <>
            <div className='min-h-screen bg-base-200 font-sans flex flex-col'>
                <Navbar />
                <div className="flex-grow pb-10">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Layout;