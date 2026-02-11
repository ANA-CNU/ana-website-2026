import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const sections = [
    {
        id: 'intro',
        title: '동아리 소개',
        color: 'text-teal-600 border-teal-600',
        items: [
            { id: 'intro-ana', title: 'ANA' },
            { id: 'intro-roadmap', title: '월별 계획' },
            { id: 'intro-result', title: '실적' }
        ]
    },
    {
        id: 'activities',
        title: '활동',
        color: 'text-indigo-600 border-indigo-600',
        items: [
            { id: 'act-contest', title: '대회' },
            { id: 'act-education', title: '교육' },
            // { id: 'act-study', title: '스터디' },
            { id: 'act-friendship', title: '친목' },
            { id: 'act-etc', title: '그 외' }
        ]
    },
    {
        id: 'members',
        title: '임원진',
        color: 'text-rose-600 border-rose-600',
        items: [
            { id: 'mem-president', title: '회장 & 부회장' },
            { id: 'mem-manager', title: '총무' },
            { id: 'mem-education', title: '교육부' },
            { id: 'mem-personnel', title: '인사부' },
            { id: 'mem-promote', title: '홍보부' },
            { id: 'mem-planning', title: '기획부' }
        ]
    }
];

const About = () => {
    const [activeId, setActiveId] = useState(sections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
            section.items.forEach((sub) => {
                const subElement = document.getElementById(sub.id);
                if (subElement) observer.observe(subElement);
            })
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -50;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl font-mulmaru">
            <div className="flex flex-col lg:flex-row gap-10 relative">

                <div className="w-full lg:w-3/4 space-y-20">

                    <Intro />
                    <Activities />
                    <Members />

                </div>


                <aside className="hidden lg:block w-1/4 relative">
                    <div className="sticky top-24">
                        <div className="border-base-200 pl-4 py-2 flex flex-col items-center">
                            <h3 className="font-bold text-gray-400 mb-5 text-lg tracking-widest">ABOUT</h3>
                            <ul className="space-y-7">
                                {sections.map((section) => {
                                    const isActiveMain = section.id === activeId || section.items.some(item => item.id === activeId)

                                    return <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            className={`text-3xl text-left transition-all duration-300 ${isActiveMain
                                                ? `${section.color} font-bold scale-110 translate-x-1 border-l-4  pl-2 -ml-6`
                                                : 'text-gray-500 hover:text-gray-800'
                                                }`}
                                        >
                                            {section.title}
                                        </button>

                                        {isActiveMain && (
                                            <ul className="mt-3 space-y-1 pl-2 animate-fade-in">
                                                {section.items.map((sub) => (
                                                    <li key={sub.id}>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                scrollToSection(sub.id);
                                                            }}
                                                            className={`text-xl text-left transition-colors duration-200 block py-1 ${activeId === sub.id
                                                                ? 'text-gray-900 font-bold scale-110 origin-left'
                                                                : 'text-gray-400 hover:text-gray-600'
                                                                }`}
                                                        >
                                                            - {sub.title}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default About;


const Intro = () => {
    return <section id="intro" className="min-h-[50vh]">
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-10 ml-10 text-teal-600">동아리 소개</h2>

        <div id='intro-ana' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-bold underline decoration-teal-600 decoration-10">ANA</h3>
            <p className="text-xl sm:text-2xl mt-8">
                알고리즘(Algorithm)과 문제 해결(Problem Solving) 능력으로 <br /> 세상의 실제 문제를 해결하는 동아리 (Application)
            </p>
            <p className="text-2xl sm:text-3xl font-bold mt-8">
                어떤 동아리인가요?
            </p>
            <ul className="list-disc list-inside mt-6">
                <li className="text-xl sm:text-2xl mt-4">각종 코딩 테스트와 프로그래밍 경진 대회를 준비하는 모임이에요</li>
                <li className="text-xl sm:text-2xl mt-4">알고리즘 문제 해결을 좋아하는 사람들의 모임이에요</li>
                <li className="text-xl sm:text-2xl mt-4">프로그래밍 경진 대회(ICPC, UCPC, SCPC)를 준비하는 소모임이 있어요</li>
            </ul>

            <p className="text-2xl sm:text-3xl font-bold mt-8">어디에 있나요?</p>
            <ul className="list-disc list-inside mt-6">
                <li className="text-xl sm:text-2xl mt-4">공과대학 5호관 315호 안쪽</li>
            </ul>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="aspect-square overflow-hidden rounded-md shadow-md">
                    <img src="https://anacnu.kr/images/About-5315.jpeg" alt="동방 입구" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-md shadow-md">
                    <img src="https://anacnu.kr/images/About-room.jpeg" alt="동방 내부" className="w-full h-full object-cover" />
                </div>

            </div>

            <KakaoMap />
        </div>

        <div id='intro-roadmap' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-center underline decoration-teal-600 decoration-10">
                2026년 월별 계획
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 pb-10 border-b-2 border-base-300">

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold flex items-center">
                        <span className="mr-3">🌸</span> 3월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>개강총회</p>
                        <p>Python 기초 교육</p>
                        <p>멘토멘티 프로그램</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold flex items-center">
                        <span className="mr-3">💻</span> 4월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>막동</p>
                        <p>ANAGETDON</p>
                        <p>알고리즘 기초 교육</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold flex items-center">
                        <span className="mr-3">🍺</span> 5월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>ANA MT</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-800 flex items-center">
                        <span className="mr-3">🎉</span> 6월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>종강총회</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-800 flex items-center">
                        <span className="mr-3">📅</span> 9월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>개강 총회</p>
                        <p>Java 기초 교육</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-800 flex items-center">
                        <span className="mr-3">💻</span> 10월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>SW-IT Contest</p>
                    </div>
                </div>

                <div className="bg-base-100 rounded-md shadow-md p-6 border border-base-300">
                    <p className="text-3xl sm:text-4xl font-semibold text-gray-800 flex items-center">
                        <span className="mr-3">🎓</span> 12월
                    </p>
                    <div className="text-lg mt-4 space-y-2">
                        <p>종강총회</p>
                    </div>
                </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-center mt-5">
                상시 진행
            </p>
            <ul className="list-disc list-inside mt-8 space-y-6">
                <li className="text-xl sm:text-2xl font-semibold flex items-center space-x-4">
                    <span>🏆</span>
                    <span>ANABADA 하루하나 알고리즘 챌린지</span>
                </li>
                <li className="text-xl sm:text-2xl font-semibold flex items-center space-x-4">
                    <span>🏅</span>
                    <span>BOJ, Atcoder, Codeforces 대회 참여</span>
                </li>
                <li className="text-xl sm:text-2xl font-semibold flex items-center space-x-4">
                    <span>🎓</span>
                    <span>ICPC, UCPC, SCPC 등 대회 준비</span>
                </li>
                <li className="text-xl sm:text-2xl font-semibold flex items-center space-x-4">
                    <span>⚽</span>
                    <span>풋살 모임</span>
                </li>
                <li className="text-xl sm:text-2xl font-semibold flex items-center space-x-4">
                    <span>📅</span>
                    <span>대외활동 모임</span>
                </li>
            </ul>
        </div>

        <div id='intro-result' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-teal-600 decoration-10">실적</h3>
            <p className="text-xl sm:text-2xl mt-10">
                2024-1 DevDay: 대상 1, 금상 1, 은상 4, 동상 3, 장려상 4 <br />
                2024-2 DevDay: 대상 1, 금상 1, 은상 2, 동상 7, 장려상 7
            </p>
            <div id="ICPCAsiaPreliminary2024" className="flex flex-col justify-start items-start">
                <ul className="list-disc list-inside mt-4">
                    <li className="text-xl sm:text-2xl mt-2 font-bold">2024 ICPC Asia Seoul Preliminary Contest</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-5 w-full border border-gray-300 text-left mt-3">
                    {/* 헤더 */}
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">#</div>
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">팀</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300">참가자</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>

                    {/* 데이터 */}
                    <div className="p-2 border-b border-gray-300">96</div>
                    <div className="p-2 border-b border-gray-300">ANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/ygonepiece">ygonepiece</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/awj1052">awj1052</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/gytjdttop">gytjdtop</a></div>

                    <div className="p-2 border-b border-gray-300">99</div>
                    <div className="p-2 border-b border-gray-300">BANANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/suminwow1">suminwow1</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/tjgus1668">tjgus1668</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/factwy">factwy</a></div>

                    <div className="p-2 border-b border-gray-300">306</div>
                    <div className="p-2 border-b border-gray-300">HelloWorldgosu</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/jhlee040610">jhlee040610</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/mycse24">mycse24</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/baek1004">baek1004</a></div>
                </div>
            </div>

            <div id="ICPCAsiaRegional2024" className="flex flex-col justify-start items-start">
                <ul className="list-disc list-inside mt-4">
                    <li className="text-xl sm:text-2xl mt-2 font-bold">2024 ICPC Asia Seoul Regional Contest</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-5 w-full border border-gray-300 text-left mt-3">

                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">#</div>
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">팀</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300">참가자</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>

                    <div className="p-2 border-b border-gray-300">79</div>
                    <div className="p-2 border-b border-gray-300">ANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/ygonepiece">ygonepiece</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/awj1052">awj1052</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/gytjdttop">gytjdtop</a></div>
                </div>
            </div>

            <div id="UCPCPreliminary2024" className="flex flex-col justify-start items-start">
                <ul className="list-disc list-inside mt-4">
                    <li className="text-xl sm:text-2xl mt-2 font-bold">2024 UCPC 예선</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-5 w-full border border-gray-300 text-left mt-3">
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">#</div>
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">팀</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300">참가자</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>

                    <div className="p-2 border-b border-gray-300">91</div>
                    <div className="p-2 border-b border-gray-300">BANANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/suminwow1">suminwow1</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/tjgus1668">tjgus1668</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/factwy">factwy</a></div>

                    <div className="p-2 border-b border-gray-300">100</div>
                    <div className="p-2 border-b border-gray-300">ANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/ygonepiece">ygonepiece</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/awj1052">awj1052</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 font-bold">
                        <a href="https://www.acmicpc.net/user/gytjdttop">gytjdtop</a></div>
                </div>
            </div>
        </div>
    </section>
}

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const drawMap = () => {
            const container = mapRef.current;

            const coords = new window.kakao.maps.LatLng(36.366487, 127.344933);

            const options = {
                center: coords,
                level: 3,
            };

            const map = new window.kakao.maps.Map(container, options);

            const marker = new window.kakao.maps.Marker({
                position: coords,
            });
            marker.setMap(map);
        };

        if (window.kakao && window.kakao.maps) {
            drawMap();
            return;
        }

        const script = document.createElement("script");

        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7630878988eefe7f3b05515d57e508b9&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                drawMap();
            });
        };
    }, []);

    return (
        <div
            ref={mapRef}
            className="w-full aspect-[4/3] rounded-md shadow-md border border-black-100 mt-8"
        />
    );
};



const Activities = () => {

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

const Members = () => {

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