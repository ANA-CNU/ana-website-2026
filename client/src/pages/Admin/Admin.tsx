import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../../store/useAuthStore';
import useToastStore from '../../store/useToastStore';
import MemberManager from './MemberManager';
import SiteConfigEditor from './SiteConfigEditor';
import AdminManager from './AdminManager';

const Admin = () => {
    const { user, isLogin } = useAuthStore();
    const { showToast } = useToastStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'members' | 'siteconfig' | 'admins'>('members');

    useEffect(() => {
        if (!isLogin || !user?.admin) {
            showToast('관리자 권한이 없습니다.', 'error');
            navigate('/');
        }
    }, [isLogin, user, navigate]);

    if (!user?.admin) return null;

    return (
        <div className="container mx-auto p-4 py-8">
            <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>

            <div role="tablist" className="tabs tabs-boxed mb-6">
                <a
                    role="tab"
                    className={`tab ${activeTab === 'members' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('members')}
                >
                    회원 관리
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'siteconfig' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('siteconfig')}
                >
                    사이트 설정
                </a>
                <a
                    role="tab"
                    className={`tab ${activeTab === 'admins' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('admins')}
                >
                    관리자 관리
                </a>
            </div>

            <div className="bg-base-200 rounded-lg p-6 shadow-md">
                {activeTab === 'members' && <MemberManager />}
                {activeTab === 'siteconfig' && <SiteConfigEditor />}
                {activeTab === 'admins' && <AdminManager />}
            </div>
        </div>
    );
};

export default Admin;
