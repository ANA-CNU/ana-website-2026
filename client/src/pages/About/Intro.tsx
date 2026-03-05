import React, { useEffect, useRef } from 'react';

const Intro: React.FC = () => {
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
                    <img src="/images/dongbang1.jpeg" alt="동방 입구" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-md shadow-md">
                    <img src="/images/dongbang2.jpeg" alt="동방 내부" className="w-full h-full object-cover" />
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
                2024-2 DevDay: 대상 1, 금상 1, 은상 2, 동상 7, 장려상 7 <br />
                2025-1 DevDay: 대상 1, 금상 2, 은상 2, 동상 5, 장려상 4 <br />
                2025-2 DevDay: 대상 1, 금상 1, 은상 3, 동상 4, 장려상 6
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

            {/* <div id="UCPCPreliminary2024" className="flex flex-col justify-start items-start">
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
            </div> */}

            <div id="ICPCAsiaPreliminary2025" className="flex flex-col justify-start items-start">
                <ul className="list-disc list-inside mt-4">
                    <li className="text-xl sm:text-2xl mt-2 font-bold">2025 ICPC Asia Seoul Preliminary Contest</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-5 w-full border border-gray-300 text-left mt-3">
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">#</div>
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">팀</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300">참가자</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>

                    <div className="p-2 border-b border-gray-300">80</div>
                    <div className="p-2 border-b border-gray-300">ANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/awj1052">awj1052</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/tjgus1668">tjgus1668</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/hhs2003">hhs2003</a></div>

                    <div className="p-2 border-b border-gray-300">95</div>
                    <div className="p-2 border-b border-gray-300">ANAlog</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>

                    <div className="p-2 border-b border-gray-300">133</div>
                    <div className="p-2 border-b border-gray-300">BANANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300">
                        <a href="https://www.acmicpc.net">?</a></div>

                    <div className="p-2 border-b border-gray-300">145</div>
                    <div className="p-2 border-b border-gray-300">SSALMUK</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/ppaemon">ppaemon</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/hongjk2006">hongjk2006</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/rkdalsdn0647">rkdalsdn0647</a></div>

                    <div className="p-2 border-b border-gray-300">175</div>
                    <div className="p-2 border-b border-gray-300">NOMAC</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/agape6614">agape6614</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/standardrkd">standardrkd</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/hraverals">hraverals</a></div>
                </div>
            </div>

            <div id="ICPCAsiaRegional2025" className="flex flex-col justify-start items-start">
                <ul className="list-disc list-inside mt-4">
                    <li className="text-xl sm:text-2xl mt-2 font-bold">2025 ICPC Asia Seoul Regional Contest</li>
                </ul>
                <div className="grid grid-cols-2 sm:grid-cols-5 w-full border border-gray-300 text-left mt-3">

                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">#</div>
                    <div className="p-2 font-bold bg-gray-100 border-b border-gray-300">팀</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300">참가자</div>
                    <div className="hidden sm:block p-2 font-bold bg-gray-100 border-b border-gray-300"></div>

                    <div className="p-2 border-b border-gray-300">61</div>
                    <div className="p-2 border-b border-gray-300">ANA</div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/awj1052">awj1052</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/tjgus1668">tjgus1668</a></div>
                    <div className="hidden sm:block p-2 border-b border-gray-300 hover:underline">
                        <a href="https://www.acmicpc.net/user/hhs2003">hhs2003</a></div>
                </div>
            </div>
        </div>

        <div id='intro-video' className='bg-base-100 p-10 rounded-md border border-base-300 mb-10'>
            <h3 className="text-3xl sm:text-4xl font-extrabold underline decoration-teal-600 decoration-10">소개 영상</h3>

            <video
                className="w-full rounded-md shadow-md mt-10"
                controls
                loop
            >
                <source src="/videos/ana_orientation.mp4" type="video/mp4" />
                브라우저가 비디오 태그를 지원하지 않습니다.
            </video>
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

            const coords = new window.kakao.maps.LatLng(36.366455, 127.344622);

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

export default Intro;