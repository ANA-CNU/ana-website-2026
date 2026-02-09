import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import useToastStore from '../../store/useToastStore';

interface Member {
    _id: string;
    name: string;
    userid: string;
    number: string;
    email?: string;
}

const MemberManager = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToastStore();

    // Form state
    const [newName, setNewName] = useState('');
    const [newUserid, setNewUserid] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const fetchMembers = async () => {
        try {
            const res = await api.get('/api/auth/members');
            if (res.data.success) {
                setMembers(res.data.members);
            }
        } catch (error) {
            console.error('Failed to fetch members', error);
            alert('회원 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/member', {
                name: newName,
                userid: newUserid,
                number: newNumber,
                email: newEmail
            });
            if (res.data.success) {
                showToast('회원이 추가되었습니다.', 'success');
                // Clear form
                setNewName('');
                setNewUserid('');
                setNewNumber('');
                setNewEmail('');
                // Refresh list
                fetchMembers();
            }
        } catch (error: any) {
            console.error('Failed to add member', error);
            showToast(error.response?.data?.message || '회원 추가에 실패했습니다.', 'error');
        }
    };

    const handleDeleteMember = async (userid: string) => {
        if (!confirm(`${userid} 회원을 삭제하시겠습니까?`)) return;

        try {
            const res = await api.delete(`/api/auth/member/${userid}`);
            if (res.data.success) {
                showToast('회원이 삭제되었습니다.', 'success');
                fetchMembers();
            }
        } catch (error: any) {
            console.error('Failed to delete member', error);
            showToast(error.response?.data?.message || '회원 삭제에 실패했습니다.', 'error');
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">회원 관리</h2>

            {/* Add Member Form */}
            <form onSubmit={handleAddMember} className="mb-8 p-4 bg-base-100 rounded-md shadow">
                <h3 className="text-xl font-semibold mb-4">회원 추가</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">이름</span></label>
                        <input
                            type="text"
                            placeholder="이름"
                            className="input input-bordered w-full"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">학번</span></label>
                        <input
                            type="text"
                            placeholder="학번 (9자리)"
                            className="input input-bordered w-full"
                            value={newUserid}
                            onChange={(e) => setNewUserid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">전화번호</span></label>
                        <input
                            type="text"
                            placeholder="010-0000-0000"
                            className="input input-bordered w-full"
                            value={newNumber}
                            onChange={(e) => setNewNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">이메일 (선택)</span></label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="input input-bordered w-full"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button type="submit" className="btn btn-primary">추가</button>
                </div>
            </form>

            {/* Member List */}
            <div className="overflow-x-auto">
                <table className="table bg-base-100 w-full rounded-md shadow">
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>학번</th>
                            <th>전화번호</th>
                            <th>이메일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member) => (
                            <tr key={member._id}>
                                <td>{member.name}</td>
                                <td>{member.userid}</td>
                                <td>{member.number}</td>
                                <td>{member.email || '-'}</td>
                                <td>
                                    <button
                                        className="btn btn-error btn-xs"
                                        onClick={() => handleDeleteMember(member.userid)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {members.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4">등록된 회원이 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberManager;
