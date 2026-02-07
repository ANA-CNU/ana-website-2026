import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

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
        _id: string;
        name: string;
    };
}

interface GalleryListResponse {
    success: boolean;
    albums: Album[];
}

const GalleryList: React.FC = () => {
    const { user } = useAuthStore();
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get<GalleryListResponse>('/api/gallery/albums');
                if (res.data.success) {
                    setAlbums(res.data.albums);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAlbums();
    }, []);

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">갤러리</h1>

            <div className="flex justify-end mb-4">
                {user && (user.admin || user.member) && (
                    <Link to="/gallery/write" className="btn btn-primary btn-sm">
                        앨범 추가
                    </Link>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {Array.from({length: 9}).map((_, i) => (
                        <div key={i} className='aspect-square skeleton' />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {albums.map((album) => (
                        <Link to={`/gallery/${album.urlid}`} key={album.urlid} className="group relative aspect-square bg-gray-200 overflow-hidden cursor-pointer block">
                            {album.images && album.images.length > 0 ? (
                                <img
                                    src={`/api/images/${album.images[0].name}`}
                                    alt="Album Cover"
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-103 group-hover:brightness-90"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No Image
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

            )
            }
            {albums.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    등록된 앨범이 없습니다.
                </div>
            )}
        </div >
    );
};

export default GalleryList;
