import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';
import DOMPurify from 'dompurify';

interface Image {
    _id: string;
    name: string;
}

interface Album {
    _id: string;
    urlid: string;
    content: string;
    images: Image[];
    author: {
        userid: string;
        name: string;
    };
    createdAt: string;
}

interface AlbumDetailResponse {
    success: boolean;
    album: Album;
}

const GalleryDetail: React.FC = () => {
    const { urlid } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [album, setAlbum] = useState<Album | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        if (album && currentIndex < album.images.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        axios.get<AlbumDetailResponse>(`/api/gallery/album/${urlid}`)
            .then(res => {
                if (res.data.success) {
                    res.data.album.content = DOMPurify.sanitize(res.data.album.content);
                    setAlbum(res.data.album);
                }
            })
            .catch(err => {
                console.error(err);
                alert('앨범을 불러오는데 실패했습니다.');
                navigate('/gallery');
            })
            .finally(() => setLoading(false));
    }, [urlid, navigate]);

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await axios.delete(`/api/gallery/album/${urlid}`);
            alert('삭제되었습니다.');
            navigate('/gallery');
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || '삭제 실패');
        }
    };

    if (loading) return <div className="text-center py-10">로딩 중...</div>;
    if (!album) return null;

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <div className="bg-base-100 shadow-lg overflow-hidden border border-base-200">
                {/* Header */}
                <div className="p-4 border-b border-base-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8 h-8 flex items-center justify-center">
                                <span className="text-xs">{album.author.name[0]}</span>
                            </div>
                        </div>
                        <span className="font-bold text-sm">{album.author.name}</span>
                    </div>
                    {/* <button className="btn btn-ghost btn-circle btn-sm">
                        ...
                    </button> */}
                    {user && album && (user.admin || user.userid === album.author.userid) && (
                        <button onClick={handleDelete} className="btn btn-ghost btn-circle btn-sm text-error" title="삭제">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Images Carousel */}
                <div className="relative w-full aspect-square bg-black flex items-center justify-center overflow-hidden group">
                    {album.images.length > 0 && (
                        <img
                            src={`/api/images/${album.images[currentIndex].name}`}
                            alt={`Album Content ${currentIndex + 1}`}
                            className="w-full h-full object-contain"
                        />
                    )}

                    {/* Navigation Buttons */}
                    {album.images.length > 1 && (
                        <>
                            {currentIndex > 0 && (
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-ghost bg-black/20 text-white hover:bg-black/40 border-none"
                                >
                                    ❮
                                </button>
                            )}
                            {currentIndex < album.images.length - 1 && (
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm btn-ghost bg-black/20 text-white hover:bg-black/40 border-none"
                                >
                                    ❯
                                </button>
                            )}
                            {/* Pagination Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                                {album.images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${idx === currentIndex ? 'bg-white' : 'bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="whitespace-pre-wrap text-sm mb-2">
                        <span className="font-bold mr-2">{album.author.name}</span>
                        {album.content}
                    </p>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                        {new Date(album.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <button onClick={() => navigate('/gallery')} className="btn btn-outline btn-sm">
                    목록으로
                </button>
            </div>
        </div >
    );
};

export default GalleryDetail;
