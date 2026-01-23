import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuthStore } from '../store/useAuthStore';

const LoginSuccess: React.FC = () => {
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get('accessToken');
    const { login } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            login(accessToken);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [accessToken, login, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default LoginSuccess;
