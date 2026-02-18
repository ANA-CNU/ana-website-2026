import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import useToastStore from '../../store/useToastStore';

interface SiteConfig {
    banner: {
        imageUrl: string;
        title: string;
        description: string;
        linkUrl: string;
    };
    todayProblem: {
        tier: string;
        title: string;
        linkUrl: string;
    }[];
    information: {
        label: string;
        value: string;
    }[];
}

const SiteConfigEditor = () => {
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToastStore();

    const fetchConfig = async () => {
        try {
            const res = await api.get('/api/siteconfig');
            if (res.data.success) {
                setConfig(res.data.siteConfig);
            }
        } catch (error) {
            console.error('Failed to fetch site config', error);
            showToast('사이트 설정을 불러오는데 실패했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const handleSave = async () => {
        if (!config) return;

        try {
            const res = await api.put('/api/siteconfig', { siteConfig: config });
            if (res.data.success) {
                showToast('사이트 설정이 저장되었습니다.', 'success');
            }
        } catch (error: any) {
            console.error('Failed to save site config', error);
            showToast(error.response?.data?.message || '사이트 설정 저장에 실패했습니다.', 'error');
        }
    };

    const handleBannerChange = (key: keyof SiteConfig['banner'], value: string) => {
        if (!config) return;
        setConfig({
            ...config,
            banner: {
                ...config.banner,
                [key]: value
            }
        });
    };

    /*
    const handleTodayProblemChange = (key: keyof SiteConfig['todayProblem'], value: string) => {
        if (!config) return;
        setConfig({
            ...config,
            todayProblem: {
                ...config.todayProblem,
                [key]: value
            }
        });
    };
    */

    const handleInfoChange = (index: number, key: 'label' | 'value', value: string) => {
        if (!config) return;
        const newInfo = [...config.information];
        newInfo[index] = { ...newInfo[index], [key]: value };
        setConfig({ ...config, information: newInfo });
    };

    const addInfo = () => {
        if (!config) return;
        setConfig({
            ...config,
            information: [...config.information, { label: '', value: '' }]
        });
    };

    const removeInfo = (index: number) => {
        if (!config) return;
        const newInfo = [...config.information];
        newInfo.splice(index, 1);
        setConfig({ ...config, information: newInfo });
    };

    if (loading) return <div>로딩 중...</div>;
    if (!config) return <div>설정을 불러올 수 없습니다.</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">사이트 설정</h2>

            <div className="space-y-8">
                {/* Banner Section */}
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">배너 설정</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">이미지 URL</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.banner.imageUrl}
                                onChange={(e) => handleBannerChange('imageUrl', e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">제목</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.banner.title}
                                onChange={(e) => handleBannerChange('title', e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">설명</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.banner.description}
                                onChange={(e) => handleBannerChange('description', e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">링크 URL</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.banner.linkUrl}
                                onChange={(e) => handleBannerChange('linkUrl', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Today's Problem Section */}
                {/* <div className="bg-base-100 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">오늘의 문제</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="form-control">
                            <label className="label"><span className="label-text">난이도 (Tier)</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.todayProblem.tier}
                                onChange={(e) => handleTodayProblemChange('tier', e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">문제 제목</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.todayProblem.title}
                                onChange={(e) => handleTodayProblemChange('title', e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">링크 URL</span></label>
                            <input
                                type="text"
                                className="input input-bordered"
                                value={config.todayProblem.linkUrl}
                                onChange={(e) => handleTodayProblemChange('linkUrl', e.target.value)}
                            />
                        </div>
                    </div>
                </div> */}

                {/* Information Stats Section */}
                <div className="bg-base-100 p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">정보 통계</h3>
                        <button className="btn btn-sm btn-primary" onClick={addInfo}>항목 추가</button>
                    </div>
                    <div className="space-y-4">
                        {config.information.map((info, index) => (
                            <div key={index} className="flex gap-4 items-end">
                                <div className="form-control flex-1">
                                    <label className="label"><span className="label-text">라벨</span></label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={info.label}
                                        onChange={(e) => handleInfoChange(index, 'label', e.target.value)}
                                    />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label"><span className="label-text">값</span></label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={info.value}
                                        onChange={(e) => handleInfoChange(index, 'value', e.target.value)}
                                    />
                                </div>
                                <button
                                    className="btn btn-error btn-square"
                                    onClick={() => removeInfo(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                        {config.information.length === 0 && (
                            <div className="text-center text-gray-500 py-4">등록된 정보가 없습니다.</div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="btn btn-primary btn-lg" onClick={handleSave}>설정 저장</button>
                </div>
            </div>
        </div>
    );
};

export default SiteConfigEditor;
