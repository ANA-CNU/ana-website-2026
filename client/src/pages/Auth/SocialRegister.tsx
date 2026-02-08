import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';

const SocialRegister: React.FC = () => {
    const [searchParams] = useSearchParams();
    const registerToken = searchParams.get('registerToken');

    const [name, setName] = useState('');
    const [userid, setUserid] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/social/register', {
                registerToken,
                name,
                userid
            });
            if (res.data.success) {
                login(res.data.accessToken);
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || '회원가입에 실패했습니다.');
        }
    };

    if (!registerToken) {
        return <div className="text-center py-20 text-error">잘못된 접근입니다.</div>
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">추가 정보 입력</h2>
                    <p className="text-center text-sm text-gray-500 mb-4">소셜 로그인 가입을 위해<br />이름과 학번을 입력해주세요.</p>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">이름</span>
                            </label>
                            <input
                                type="text"
                                placeholder="이름을 입력하세요"
                                className="input input-bordered"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">학번 / 아이디</span>
                            </label>
                            <input
                                type="text"
                                placeholder="학번을 입력하세요"
                                className="input input-bordered"
                                value={userid}
                                onChange={(e) => setUserid(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-error text-sm text-center">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">가입 완료</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SocialRegister;
