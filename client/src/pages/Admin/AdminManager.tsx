import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import useToastStore from '../../store/useToastStore';

interface User {
    _id: string;
    name: string;
    userid: string;
    admin: boolean;
    member: boolean;
    googleid?: string;
    githubid?: string;
}

const AdminManager = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToastStore();

    const fetchUsers = async () => {
        try {
            const res = await api.get('/api/auth/users');
            if (res.data.success) {
                setUsers(res.data.users);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
            showToast('유저 목록을 불러오는데 실패했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleAdmin = async (userid: string, currentStatus: boolean) => {
        const action = currentStatus ? 'off' : 'on';
        const message = currentStatus
            ? `${userid} 님의 관리자 권한을 해제하시겠습니까?`
            : `${userid} 님에게 관리자 권한을 부여하시겠습니까?`;

        if (!confirm(message)) return;

        try {
            const res = await api.patch(`/api/auth/admin/${action}`, { userid });
            if (res.data.success) {
                showToast('관리자 권한이 변경되었습니다.', 'success');
                fetchUsers();
            }
        } catch (error: any) {
            console.error('Failed to toggle admin status', error);
            showToast(error.response?.data?.message || '권한 변경에 실패했습니다.', 'error');
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">관리자 권한 관리</h2>

            <div className="overflow-x-auto">
                <table className="table bg-base-100 w-full rounded-lg shadow">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>학번</th>
                            <th>관리자 여부</th>
                            <th>회원 여부</th>
                            <th>소셜 연동</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.userid}</td>
                                <td>
                                    {user.admin ? (
                                        <span className="badge badge-primary">관리자</span>
                                    ) : (
                                        <span className="badge badge-ghost">일반</span>
                                    )}
                                </td>
                                <td>
                                    {user.member ? (
                                        <span className="badge badge-success">회원</span>
                                    ) : (
                                        <span className="badge badge-ghost">비회원</span>
                                    )}
                                </td>
                                <td className="flex gap-2">
                                    {user.googleid && <span className="badge badge-info badge-outline">Google</span>}
                                    {user.githubid && <span className="badge badge-neutral badge-outline">GitHub</span>}
                                </td>
                                <td>
                                    <button
                                        className={`btn btn-xs ${user.admin ? 'btn-warning' : 'btn-success'}`}
                                        onClick={() => toggleAdmin(user.userid, user.admin)}
                                    >
                                        {user.admin ? '권한 해제' : '권한 부여'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManager;
