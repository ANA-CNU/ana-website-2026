import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './pages/Layout';
import Home from './pages/Home';

import BoardList from './pages/Board/BoardList';
import PostDetail from './pages/Board/PostDetail';
import PostWrite from './pages/Board/PostWrite';
import CnuNoticeDetail from './pages/Board/CnuNoticeDetail';

import About from './pages/About';

import GalleryList from './pages/GalleryList';
import AlbumDetail from './pages/AlbumDetail';
import AlbumWrite from './pages/AlbumWrite';

import Login from './pages/Login';
import Register from './pages/Register';
import SocialRegister from './pages/SocialRegister';
import LoginSuccess from './pages/LoginSuccess';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/social' element={<SocialRegister />} />
                <Route path='/login/success' element={<LoginSuccess />} />

                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path='/about' element={<About />} />

                    <Route path='/gallery' element={<GalleryList />} />
                    <Route path='/gallery/write' element={<AlbumWrite />} />
                    <Route path='/gallery/:urlid' element={<AlbumDetail />} />

                    <Route path='/board/notice' element={<BoardList category="notice" />} />
                    <Route path='/board/free' element={<BoardList category="free" />} />
                    <Route path='/board/algorithm' element={<BoardList category="algorithm" />} />
                    <Route path='/board/cnunotice' element={<BoardList category="cnunotice" />} />
                    
                    <Route path='/board/write' element={<PostWrite />} />
                    <Route path='/board/edit/:urlid' element={<PostWrite />} />
                    <Route path='/board/cnunotice/:urlid' element={<CnuNoticeDetail />} />
                    <Route path='/board/:urlid' element={<PostDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App