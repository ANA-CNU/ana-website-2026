// 404 릴스용 error페이지 (자세한 릴스는 ana 공식 인스타에서..)
import React, { useState } from 'react';

const ErrorPage: React.FC = () => {
    const [isError, setIsError] = useState(true);

    return <>
        {isError ? (
            <div onClick={() => { setIsError(false) }} className='w-screen h-screen bg-red-600 flex justify-center items-center'>
                <h1 className='text-9xl font-extrabold text-red-50'>404 ERROR</h1>
            </div>
        ) : (
            <div onClick={() => { setIsError(true) }} className='w-screen h-screen bg-green-600 flex justify-center items-center'>
                <h1 className='text-9xl font-extrabold text-green-50'>200 OK</h1>
            </div>
        )}
    </>
}

export default ErrorPage;