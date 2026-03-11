import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Link } from 'react-router';

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

interface GalleryResponse {
    success: boolean;
    albums: Album[];
}

const MiniGallery: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await api.get<GalleryResponse>('/api/gallery/albums');
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
        <div className="card bg-base-100 shadow-md h-full overflow-hidden border border-base-200 md:col-span-2">

            <div className="bg-primary px-5 py-2 flex justify-between items-center">
                <h3 className="font-bold text-primary-content text-lg flex items-center gap-2">
                    갤러리
                </h3>
                <Link to={`/gallery`} className="text-xs text-primary-content/80 hover:text-white hover:underline">
                    더보기 +
                </Link>
            </div>

            {loading ? (
                <div className='card-body p-4 grid grid-cols-4 gap-4'>
                    {[0, 1].map((el) => (
                        <div key={el} className='aspect-square skeleton' />
                    ))}
                </div>
            ) : (
                <div className="card-body p-4 grid grid-cols-4 gap-4">
                    {albums.slice(0, 4).map((album) => (
                        <Link to={`/gallery/${album.urlid}`} key={album.urlid}>
                            <img
                                src={`${import.meta.env.VITE_SERVER_URL || ''}/api/images/${album.images[0].name}`}
                                alt="Album Cover"
                                className='aspect-square object-cover hover:brightness-90'
                            />
                        </Link>
                    ))}
                </div>
            )}

        </div>
    )
}

export default MiniGallery