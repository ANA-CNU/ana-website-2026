import React from "react"


const AvatarCard: React.FC<{ src: string, name: string, role: string, info: string }> = ({ src, name, role, info }) => {
    return <div className='flex flex-row sm:flex-col justify-around items-center rounded-md border border-base-300 shadow-md p-5 gap-3 w-70 sm:w-50'>
        <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-30 md:w-40 rounded-full ring-2 ring-offset-2">
                <img src={src} />
            </div>
        </div>
        <div className='flex flex-col justify-around items-center'>
            <h4 className='text-xl text-primary font-bold'>{name}</h4>
            <p className='text-lg text-rose-800 font-bold'>{role}</p>
            <p className='hidden md:block text-sm text-primary'>{info}</p>
        </div>
    </div>
}

const Members: React.FC = () => {

    return <section id="members" className="min-h-[50vh]">

        <h2 className="text-3xl sm:text-5xl font-extrabold mb-10 ml-10 text-rose-600">임원진</h2>

        <div id='mem-president' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">회장 & 부회장</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member1.png' name='황현석' role='회장' info='컴퓨터융합학부 22학번' />
                <AvatarCard src='/images/member2.png' name='박종현' role='부회장' info='컴퓨터융합학부 22학번' />
            </div>
        </div>

        <div id='mem-manager' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">총무</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member3.png' name='장현성' role='총무' info='컴퓨터융합학부 21학번' />
            </div>
        </div>

        <div id='mem-education' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">교육부</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member7.png' name='김동희' role='교육부장' info='컴퓨터융합학부 25학번' />
                <AvatarCard src='/images/member8.png' name='표강준' role='교육부원' info='컴퓨터융합학부 25학번' />
                <AvatarCard src='/images/member9.png' name='강민우' role='교육부원' info='컴퓨터융합학부 25학번' />
            </div>
        </div>

        <div id='mem-personnel' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">인사부</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member4.png' name='김기원' role='인사부장' info='컴퓨터융합학부 22학번' />
                <AvatarCard src='/images/member5.png' name='박찬종' role='인사부원' info='컴퓨터융합학부 22학번' />
                <AvatarCard src='/images/member6.png' name='전민기' role='인사부원' info='컴퓨터융합학부 22학번' />
            </div>
        </div>

        <div id='mem-promote' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">홍보부</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member12.png' name='심하은' role='홍보부장' info='경영학부 25학번' />
                <AvatarCard src='/images/member13.png' name='박정현' role='홍보부원' info='컴퓨터융합학부 25학번' />
            </div>
        </div>

        <div id='mem-planning' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-rose-600 decoration-10 mb-10">기획부</h3>
            <div className="flex flex-col sm:flex-row justify-evenly items-center">
                <AvatarCard src='/images/member10.png' name='안소원' role='기획부장' info='컴퓨터융합학부 25학번' />
                <AvatarCard src='/images/member11.png' name='박준혁' role='기획부원' info='컴퓨터융합학부 25학번' />
            </div>
        </div>

    </section>
}

export default Members