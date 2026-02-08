import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { useNavigate, useParams } from 'react-router';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    Bold, Essentials, Italic, Paragraph, Undo, Heading, List, Font,
    FileRepository, Image, ImageUpload, ImageResize, ImageToolbar, ImageStyle, ImageCaption,
    Autoformat, BlockQuote, Code, CodeBlock, HtmlEmbed, HorizontalLine, Indent, IndentBlock,
    Link, AutoLink, MediaEmbed, PasteFromOffice, Table, TableToolbar, TextTransformation, Alignment
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import CustomUploadAdapter from '../../Utils/CustomUploadAdapter';
import useToastStore from '../../store/useToastStore';

function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new CustomUploadAdapter(loader);
    };
}

const PostWrite: React.FC = () => {
    const { urlid } = useParams();
    const navigate = useNavigate();
    const isEdit = !!urlid;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('free');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToastStore();

    useEffect(() => {
        if (isEdit) {
            api.get(`/api/board/post/${urlid}`)
                .then(res => {
                    if (res.data.success) {
                        const { title, content, category } = res.data.post;
                        setTitle(title);
                        setContent(content);
                        setCategory(category);
                    }
                })
                .catch(err => {
                    console.error(err);
                    showToast('게시글 정보를 불러오지 못했습니다.', 'error');
                    navigate(-1);
                });
        }
    }, [isEdit, urlid, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await api.patch(`/api/board/post/${urlid}`, { title, content });
                showToast('수정되었습니다.', 'success');
                navigate(`/api/board/post/${urlid}`);
            } else {
                await api.post('/api/board/post', { title, content, category });
                showToast('등록되었습니다.', 'success');
                navigate(`/board/${category}`);
            }
        } catch (err: any) {
            console.error(err);
            showToast(err.response?.data?.message || '작성 실패', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEdit ? '게시글 수정' : '게시글 작성'}</h1>

            <form onSubmit={handleSubmit} className="bg-base-100 shadow-md p-6 space-y-4">
                <div>
                    <label className="label font-bold">카테고리</label>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={isEdit}
                    >
                        <option value="free">자유게시판</option>
                        <option value="notice">공지사항</option>
                        <option value="algorithm">알고리즘 꿀팁</option>
                        <option value="csenotice">학과 공지</option>
                    </select>
                </div>

                <div>
                    <label className="label font-bold">제목</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="label font-bold">내용</label>
                    <div className="prose max-w-none">
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                licenseKey: 'GPL',
                                plugins: [
                                    Essentials, Bold, Italic, Paragraph, Undo, Heading, List, Font,
                                    FileRepository, Image, ImageUpload, ImageResize, ImageToolbar, ImageStyle, ImageCaption,
                                    Autoformat, BlockQuote, Code, CodeBlock, HtmlEmbed, HorizontalLine, Indent, IndentBlock,
                                    Link, AutoLink, MediaEmbed, PasteFromOffice, Table, TableToolbar, TextTransformation, Alignment
                                ],
                                toolbar: [
                                    'undo', 'redo', '|',
                                    'heading', '|',
                                    'bold', 'italic', 'strikethrough', 'code', '|',
                                    'bulletedList', 'numberedList', 'indent', 'outdent', '|',
                                    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
                                    'link', 'imageUpload', 'insertTable', 'blockQuote', 'codeBlock', 'mediaEmbed', 'horizontalLine', '|',
                                    'alignment'
                                ],
                                heading: {
                                    options: [
                                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                                    ]
                                },
                                table: {
                                    contentToolbar: [
                                        'tableColumn', 'tableRow', 'mergeTableCells'
                                    ]
                                },
                                image: {
                                    toolbar: [
                                        'imageStyle:inline',
                                        'imageStyle:block',
                                        'imageStyle:side',
                                        '|',
                                        'toggleImageCaption',
                                        'imageTextAlternative'
                                    ]
                                },
                                extraPlugins: [MyCustomUploadAdapterPlugin],
                                initialData: content
                            }}
                            data={content}
                            onChange={(_event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">취소</button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? '저장 중...' : (isEdit ? '수정 완료' : '등록하기')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostWrite;
