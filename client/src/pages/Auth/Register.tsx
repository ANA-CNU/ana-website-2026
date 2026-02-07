import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const res = await axios.post('/api/auth/register', {
                name,
                userid,
                password
            });
            if (res.data.success) {
                alert('회원가입이 완료되었습니다. 로그인해주세요.');
                navigate('/login');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || '회원가입에 실패했습니다.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">회원가입</h2>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">비밀번호</span>
                            </label>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">비밀번호 확인</span>
                            </label>
                            <input
                                type="password"
                                placeholder="비밀번호를 다시 입력하세요"
                                className="input input-bordered"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-error text-sm text-center">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">가입하기</button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-sm link link-hover text-gray-500">
                            이미 계정이 있으신가요? 로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
