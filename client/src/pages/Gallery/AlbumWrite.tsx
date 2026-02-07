import React, { useState, useCallback, useRef } from 'react';
import type { ChangeEvent, FormEvent, DragEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import heic2any from 'heic2any';

const AlbumWrite: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [processing, setProcessing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redirect if not authorized
    React.useEffect(() => {
        if (!user) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [user, navigate]);

    const processFiles = async (files: File[]) => {
        if (processing) return;

        setProcessing(true);
        try {
            const convertedFiles: File[] = [];

            for (const file of files) {
                // Check if file is HEIC
                const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic';

                if (isHeic) {
                    try {
                        const blobOrBlobs = await heic2any({
                            blob: file,
                            toType: 'image/jpeg',
                            quality: 0.8
                        });

                        // Handler array result if multiple (heic2any might return array for gif-like heic, usually single)
                        const blob = Array.isArray(blobOrBlobs) ? blobOrBlobs[0] : blobOrBlobs;

                        const convertedFile = new File(
                            [blob],
                            file.name.replace(/\.heic$/i, '.jpg'),
                            { type: 'image/jpeg' }
                        );
                        convertedFiles.push(convertedFile);
                    } catch (e) {
                        console.error('HEIC conversion failed', e);
                        alert(`HEIC 변환 실패: ${file.name}`);
                    }
                } else {
                    convertedFiles.push(file);
                }
            }

            const currentCount = images.length;
            const remainingSlots = 10 - currentCount;

            if (remainingSlots <= 0) {
                alert('최대 10장까지만 업로드 가능합니다.');
                setProcessing(false);
                return;
            }

            const filesToAdd = convertedFiles.slice(0, remainingSlots);
            if (convertedFiles.length > remainingSlots) {
                alert(`최대 10장까지만 가능하여 ${convertedFiles.length - remainingSlots}장은 제외되었습니다.`);
            }

            const newImages = [...images, ...filesToAdd];
            setImages(newImages);

            const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        } catch (error) {
            console.error('Error processing files:', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await processFiles(Array.from(e.target.files));
            // Reset input so same file selection triggers change again if needed
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // Filter image types (including heic)
            // Note: DataTransferItem.type might be empty for some files, but checking extension fallback is handled in processFiles somewhat.
            // Let's filter basically.
            const files = Array.from(e.dataTransfer.files);
            await processFiles(files);
        }
    }, [images]); // Depend on images to know current count

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]); // Cleanup memory
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            alert('최소 1장의 사진을 업로드해주세요.');
            return;
        }

        setSubmitting(true);
        const formData = new FormData();
        images.forEach(image => {
            formData.append('images', image);
        });
        formData.append('content', content);

        try {
            const res = await axios.post('/api/gallery/album', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                navigate('/gallery');
            }
        } catch (err: any) {
            console.error(err);
            alert(err.response?.data?.message || '앨범 업로드 실패');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-base-100 shadow-lg overflow-hidden">
                    <div className="px-8 py-6 border-b border-base-200">
                        <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-primary" />
                            새 앨범 만들기
                        </h1>
                        <p className="mt-1 text-sm text-base-content/60">
                            멋진 사진들을 앨범으로 만들어 공유해보세요.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        {/* Drag & Drop Zone */}
                        <div className="space-y-4">
                            <label className="text-sm font-semibold text-base-content flex justify-between">
                                <span>사진 업로드 <span className="text-primary">({images.length}/10)</span></span>
                                {processing && <span className="text-sm text-warning animate-pulse flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> 처리/변환 중...</span>}
                            </label>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => !processing && fileInputRef.current?.click()}
                                className={`
                                    relative border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300
                                    flex flex-col items-center justify-center gap-4 group
                                    ${isDragging
                                        ? 'border-primary bg-primary/5 scale-[1.01]'
                                        : 'border-base-300 hover:border-primary/50 hover:bg-base-200/50'
                                    }
                                    ${processing ? 'opacity-50 pointer-events-none' : ''}
                                `}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*,.heic"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className={`p-4 rounded-full bg-base-200 transition-colors group-hover:bg-primary/10 ${isDragging ? 'bg-primary/20' : ''}`}>
                                    {processing ? (
                                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    ) : (
                                        <Upload className={`w-8 h-8 text-base-content/50 transition-colors group-hover:text-primary ${isDragging ? 'text-primary' : ''}`} />
                                    )}
                                </div>
                                <div>
                                    <p className="text-base font-medium text-base-content">
                                        {processing ? '파일 처리 중...' : '클릭하여 선택하거나 여기로 드래그하세요'}
                                    </p>
                                    <p className="text-sm text-base-content/40 mt-1">
                                        JPG, PNG, GIF, WEBP, HEIC (최대 10장)
                                    </p>
                                </div>
                            </div>

                            {/* Image Previews */}
                            {previews.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-6 animate-fade-in">
                                    {previews.map((src, idx) => (
                                        <div key={idx} className="group relative aspect-square overflow-hidden shadow-sm border border-base-200">
                                            <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                            {/* Remove overlay */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-red-500/80 transition-colors text-white"
                                                    title="삭제"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                            {/* Badge */}
                                            <div className="absolute top-1 left-1 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[10px] text-white font-medium">
                                                #{idx + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content Input */}
                        <div className="form-control w-full space-y-2">
                            <label className="text-sm font-semibold text-base-content">
                                앨범 설명
                            </label>
                            <textarea
                                className="textarea textarea-bordered w-full h-40 resize-none focus:outline-hidden focus:ring-2 focus:ring-primary/20 transition-all text-base"
                                placeholder="이 앨범에 담긴 추억에 대해 이야기해주세요..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-base-200">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="btn btn-ghost hover:bg-base-200"
                                disabled={submitting}
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-8 min-w-[120px]"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        업로드 중...
                                    </>
                                ) : (
                                    '앨범 생성'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AlbumWrite;
