import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import useToastStore from '../../store/useToastStore';

const Login: React.FC = () => {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const { showToast } = useToastStore()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/login', {
                userid,
                password
            });
            if (res.data.success) {
                login(res.data.accessToken);
                showToast('로그인 성공', 'success');
                navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || '로그인에 실패했습니다.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card w-96 bg-base-100 shadow-lg">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">로그인</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">학번</span>
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
                        {error && <p className="text-error text-sm text-center">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-block">로그인</button>
                        </div>
                        <div className="text-center mt-2">
                            <Link to="/register" className="text-sm link link-hover text-gray-500">
                                계정이 없으신가요? 회원가입
                            </Link>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <div className="space-y-2">
                        <a href={`${import.meta.env.VITE_SERVER_URL}/api/auth/google`} className="btn btn-outline btn-block gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.8-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z" />
                            </svg>
                            Google로 로그인 / 회원가입
                        </a>
                        <a href={`${import.meta.env.VITE_SERVER_URL}/api/auth/github`} className="btn btn-outline btn-block gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                            </svg>
                            GitHub로 로그인 / 회원가입
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
