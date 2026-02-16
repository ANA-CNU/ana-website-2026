import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './pages/Layout/Layout';

import Home from './pages/Home';
const LazyAbout = lazy(() => import('./pages/About'));
import Recruit from './pages/Recruit';

import BoardList from './pages/Board/BoardList';
import PostDetail from './pages/Board/PostDetail';
const LazyPostWrite = lazy(() => import('./pages/Board/PostWrite'));
import CnuNoticeDetail from './pages/Board/CnuNoticeDetail';

import GalleryList from './pages/Gallery/GalleryList';
import AlbumDetail from './pages/Gallery/AlbumDetail';
const LazyAlbumWrite = lazy(() => import('./pages/Gallery/AlbumWrite'));

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import SocialRegister from './pages/Auth/SocialRegister';
import LoginSuccess from './pages/Auth/LoginSuccess';

import Admin from './pages/Admin/Admin';

import Toast from './components/Toast';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/register/social' element={<SocialRegister />} />
                <Route path='/login/success' element={<LoginSuccess />} />

                <Route path='/admin' element={<Admin />} />

                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />

                    <Route path='/about' element={<LazyAbout />} />

                    <Route path='/gallery' element={<GalleryList />} />
                    <Route path='/gallery/write' element={<LazyAlbumWrite />} />
                    <Route path='/gallery/:urlid' element={<AlbumDetail />} />

                    <Route path='/board/notice' element={<BoardList category="notice" />} />
                    <Route path='/board/free' element={<BoardList category="free" />} />
                    <Route path='/board/algorithm' element={<BoardList category="algorithm" />} />
                    <Route path='/board/cnunotice' element={<BoardList category="cnunotice" />} />

                    <Route path='/board/write' element={<LazyPostWrite />} />
                    <Route path='/board/edit/:urlid' element={<LazyPostWrite />} />
                    <Route path='/board/cnunotice/:urlid' element={<CnuNoticeDetail />} />
                    <Route path='/board/:urlid' element={<PostDetail />} />

                    <Route path='/recruit' element={<Recruit />} />
                </Route>
            </Routes>
            <Toast />
        </BrowserRouter>
    )
}

export default App