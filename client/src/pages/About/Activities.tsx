import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Activities: React.FC = () => {

    return <section id="activities" className="min-h-[50vh]">

        <h2 className="text-3xl sm:text-5xl font-extrabold mb-10 ml-10 text-indigo-600">활동</h2>

        <div id='act-contest' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>

            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-indigo-600 decoration-10 mb-10">대회</h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-7 grid-flow-dense">

                <div className='flex justify-center items-center sm:col-span-3 aspect-[5/4] rounded-md'>
                    <Swiper
                        slidesPerView={1.35}
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className=''
                    >
                        <SwiperSlide><img src="/images/anagetdon1.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/anagetdon2.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className='flex flex-col justify-around items-center p-5 sm:col-span-2'>
                    <h4 className='text-2xl sm:text-3xl text-indigo-800 font-extrabold'>ANAGETDON</h4>
                    <p className='text-lg sm:text-xl font-bold'>ANA 자체 프로그래밍 대회</p>
                    <p className='text-lg sm:text-xl text-center font-bold'>div_1 (1학년)<br />div_2 (2,3,4학년)<br />나눠서 진행</p>
                </div>

                <div className='flex justify-center items-center sm:col-start-3 sm:col-span-3 aspect-[5/4] rounded-md'>
                    <Swiper
                        slidesPerView={1.35}
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className=''
                    >
                        <SwiperSlide><img src="/images/swit4.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/swit5.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/swit1.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/swit2.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/swit3.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className='flex flex-col justify-around items-center p-5 sm:col-start-1 sm:col-span-2'>
                    <h4 className='text-2xl sm:text-3xl text-indigo-800 font-extrabold'>SW-IT CONTEST</h4>
                    <p className='text-lg sm:text-xl font-bold'>ANA 알고리즘 대회</p>
                    <p className='text-lg sm:text-xl text-center font-bold'>Baekjoon Online Judge에 동아리원들이 직접 만든 문제를 올려 개최</p>
                </div>

            </div>

        </div>

        <div id='act-education' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>

            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-indigo-600 decoration-10 mb-10">교육</h3>

            <div className='flex flex-col divide-y-3 divide-gray-200'>

                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 py-7'>
                    <img src="/images/education-java.jpg" className='rounded-md aspect-square object-cover' />
                    <img src="/images/education-python.jpg" className='rounded-md aspect-square object-cover' />
                    <div className='flex flex-row justify-center items-center col-span-2 sm:col-span-1'>
                        <h4 className='text-lg sm:text-xl text-center font-bold'>입문자용 Java & Python<br /> 교육</h4>
                    </div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 py-7'>
                    <img src="/images/education-algorithm.jpg" className='rounded-md aspect-square object-cover' />
                    <img src="/images/education-algorithm2.jpg" className='rounded-md aspect-square object-cover' />
                    <div className='flex flex-row justify-center items-center col-span-2 sm:col-span-1'>
                        <h4 className='text-lg sm:text-xl text-center font-bold'>알고리즘 초급/중급 교육</h4>
                    </div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 py-7'>
                    <img src="/images/education-hacking.jpg" className='rounded-md aspect-square object-cover' />
                    <img src="/images/education-hacking2.jpg" className='rounded-md aspect-square object-cover' />
                    <div className='flex flex-row justify-center items-center col-span-2 sm:col-span-1'>
                        <h4 className='text-lg sm:text-xl text-center font-bold'>시스템 해킹 기초 교육</h4>
                    </div>
                </div>

            </div>

        </div>

        {/* <div id='act-study' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>

            <h3 className="text-4xl font-extrabold underline decoration-indigo-600 decoration-10">스터디</h3>


        </div> */}

        <div id='act-friendship' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-indigo-600 decoration-10 mb-10">친목</h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 grid-flow-dense gap-y-7">
                <div className='flex justify-center items-center sm:col-span-3 aspect-[5/4] rounded-md overflow-hidden'>
                    <Swiper
                        slidesPerView={2.2}
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className=''
                    >
                        <SwiperSlide><img src="/images/mentor1.jpg" className="rounded-md" /></SwiperSlide>
                        <SwiperSlide><img src="/images/mentor2.jpg" className="rounded-md" /></SwiperSlide>
                        <SwiperSlide><img src="/images/mentor3.jpg" className="rounded-md" /></SwiperSlide>
                        <SwiperSlide><img src="/images/mentor4.jpg" className="rounded-md" /></SwiperSlide>
                        <SwiperSlide><img src="/images/mentor5.jpg" className="rounded-md" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className='flex flex-col justify-around items-center p-5 sm:col-span-2'>
                    <h4 className='text-2xl sm:text-3xl text-indigo-800 font-extrabold text-center'>멘토 멘티</h4>
                    <p className='text-lg sm:text-xl text-center font-bold'>신입생과 선배들간의 교류 목적 프로그램</p>
                    <p className='text-lg sm:text-xl text-center font-bold'>밥약, 공부, 축제 방문 등 다양한 활동 진행</p>
                </div>

                <div className='flex justify-center items-center sm:col-span-3 sm:col-start-3 aspect-[5/4] rounded-md'>
                    <Swiper
                        slidesPerView={1.35}
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className=''
                    >
                        <SwiperSlide><img src="/images/mt1.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/gaechong.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/jongchong.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className='flex flex-col justify-around items-center p-5 sm:col-span-2 sm:col-start-1'>
                    <h4 className='text-2xl sm:text-3xl text-indigo-800 font-extrabold text-center '>MT, 개강총회, 종강총회, 막동</h4>
                    <p className='text-lg sm:text-xl text-center font-bold'>저희 잘 놀고 잘 마셔요!!</p>
                </div>

                <div className='flex justify-center items-center sm:col-span-3 aspect-[5/4] rounded-md'>
                    <Swiper
                        slidesPerView={1.35}
                        spaceBetween={10}
                        centeredSlides={true}
                        autoplay={{ delay: 3000, disableOnInteraction: true }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className=''
                    >
                        <SwiperSlide><img src="/images/soccer.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        <SwiperSlide><img src="/images/soccer2.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                    </Swiper>
                </div>
                <div className='flex flex-col justify-around items-center p-5 sm:col-span-2'>
                    <h4 className='text-2xl sm:text-3xl text-indigo-800 font-extrabold text-center'>풋살 모임</h4>
                    <p className='text-lg sm:text-xl text-center font-bold'>저희 풋살도 잘해요~</p>
                </div>

            </div>
        </div>

        <div id='act-etc' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-indigo-600 decoration-10 mb-10">그 외</h3>

            <div className="tabs tabs-lift tabs-md sm:tabs-xl">
                <input type="radio" name="my_tabs_3" className="tab font-bold" aria-label="세미나" />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className='flex justify-center items-center aspect-[5/4] rounded-md'>
                        <Swiper
                            slidesPerView={1.35}
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{ delay: 3000, disableOnInteraction: true }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className=''
                        >
                            <SwiperSlide><img src="/images/seminar1.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                            <SwiperSlide><img src="/images/seminar2.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>


                <input type="radio" name="my_tabs_3" className="tab font-bold" aria-label="하루하나" />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className='flex justify-center items-center aspect-[5/4] rounded-md'>
                        <Swiper
                            slidesPerView={1.35}
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{ delay: 3000, disableOnInteraction: true }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className=''
                        >
                            <SwiperSlide><img src="/images/anabada2.jpg" className="rounded-md aspect-square object-contain bg-gray-500" /></SwiperSlide>
                            <SwiperSlide><img src="/images/anabada1.jpg" className="rounded-md aspect-square object-contain bg-gray-500" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <input type="radio" name="my_tabs_3" className="tab font-bold" aria-label="ICPC&UCPC" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <div className='flex justify-center items-center aspect-[5/4] rounded-md'>
                        <Swiper
                            slidesPerView={1.35}
                            spaceBetween={10}
                            centeredSlides={true}
                            autoplay={{ delay: 3000, disableOnInteraction: true }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className=''
                        >
                            <SwiperSlide><img src="/images/ucpcicpc1.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                            <SwiperSlide><img src="/images/ucpcicpc2.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                            <SwiperSlide><img src="/images/ucpcicpc3.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                            <SwiperSlide><img src="/images/ucpcicpc4.jpg" className="rounded-md aspect-square object-cover" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>

        </div>

    </section>
}

export default Activities