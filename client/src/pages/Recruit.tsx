import React, { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'motion/react';

const sections = [
    { id: 'intro', title: '인트로' },
    { id: 'info', title: '소개' },
    { id: 'activities', title: '활동' },
    { id: 'culture', title: '친목' },
    { id: 'faq', title: '자주 묻는 질문' },
    { id: 'apply', title: '입부 신청' },
    { id: 'contact', title: '문의' },
];

const activities = [
    { title: "다양한 교육", desc: "Python & Java 교육으로 기초적인 프로그래밍도 배울 수 있고, 알고리즘 교육을 통해 코딩테스트도 준비 가능해요" },
    { title: "자체 코딩 대회", desc: "ANAGETDON, SW-IT Contest, ANIGMA: 우리 동아리에서 직접 만든 문제들로 프로그래밍 대회를 개최해요" },
    { title: "프로그래밍 경진 대회 준비", desc: "ICPC, UCPC, SCPC 등 프로그래밍 경진 대회를 준비하는 소모임이 있어요" },
    { title: "하루하나 챌린지", desc: "매일매일 한 문제씩 해결하여 알고리즘 실력도 키우고 상품도 받아갈 수 있어요" },
    { title: "멘토-멘티", desc: "멘토-멘티로 선배와 친목을 쌓고, 학교생활에 관해 알 수 있어요" },
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.25 } }
};

const Recruit: React.FC = () => {
    const [activeId, setActiveId] = useState<string>(sections[0].id);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        sections.forEach((sec) => {
            const el = document.getElementById(sec.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const activeBtn = document.getElementById(`nav-item-${activeId}`);
        if (activeBtn && navRef.current) {
            activeBtn.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [activeId]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto px-5 pb-50 font-mulmaru bg-base-200">

            {/* 네비게이션 바 */}
            <nav
                ref={navRef}
                className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 -mx-5 px-5 py-3 overflow-x-auto whitespace-nowrap no-scrollbar"
            >
                <div className="flex space-x-2 px-5 min-w-max">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            id={`nav-item-${section.id}`}
                            onClick={() => scrollToSection(section.id)}
                            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeId === section.id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="space-y-24 mt-12">

                {/* 인트로 */}
                <div id="intro">
                    <motion.section
                        className="text-center py-10"
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                    >
                        <h2 className="text-4xl sm:text-5xl text-indigo-600 mb-6 leading-tight">
                            2026년,<br /><span className='bg-gradient-to-bl from-rose-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent'>ANA</span>가 여러분을<br />기다려요!
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            충남대학교 컴퓨터인공지능학부<br />알고리즘 동아리 ANA
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <button
                                onClick={() => scrollToSection('apply')}
                                className="btn btn-primary btn-lg text-white px-10 text-lg shadow-lg border-none w-full sm:w-auto rounded-xl"
                            >
                                입부신청하기 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6 inline'><path d="M22.601 2.062a1 1 0 0 0-.713-.713A11.252 11.252 0 0 0 10.47 4.972L9.354 6.296 6.75 5.668a2.777 2.777 0 0 0-3.387 1.357l-2.2 3.9a1 1 0 0 0 .661 1.469l3.073.659a13.42 13.42 0 0 0-.555 2.434 1 1 0 0 0 .284.836l3.1 3.1a1 1 0 0 0 .708.293c.028 0 .057-.001.086-.004a12.169 12.169 0 0 0 2.492-.49l.644 3.004a1 1 0 0 0 1.469.661l3.905-2.202a3.035 3.035 0 0 0 1.375-3.304l-.668-2.76 1.237-1.137A11.204 11.204 0 0 0 22.6 2.062ZM3.572 10.723l1.556-2.76a.826.826 0 0 1 1.07-.375l1.718.416-.65.772a13.095 13.095 0 0 0-1.59 2.398Zm12.47 8.222-2.715 1.532-.43-2.005a11.34 11.34 0 0 0 2.414-1.62l.743-.683.404 1.664a1.041 1.041 0 0 1-.416 1.112Zm1.615-6.965-3.685 3.386a9.773 9.773 0 0 1-5.17 2.304l-2.405-2.404a10.932 10.932 0 0 1 2.401-5.206l1.679-1.993a.964.964 0 0 0 .078-.092L11.99 6.27a9.278 9.278 0 0 1 8.81-3.12 9.218 9.218 0 0 1-3.143 8.829Zm-.923-6.164a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Z"></path></svg>
                            </button>
                            <button
                                onClick={() => scrollToSection('info')}
                                className="btn bg-base-100 btn-lg text-gray-500 px-8 text-lg border border-gray-200 hover:bg-gray-100 w-full sm:w-auto rounded-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6'><path d="M11.29,11.46a1,1,0,0,0,1.42,0l3-3A1,1,0,1,0,14.29,7L12,9.34,9.71,7A1,1,0,1,0,8.29,8.46Zm3,1.08L12,14.84l-2.29-2.3A1,1,0,0,0,8.29,14l3,3a1,1,0,0,0,1.42,0l3-3a1,1,0,0,0-1.42-1.42Z"></path></svg>
                                더 알아보기
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6'><path d="M11.29,11.46a1,1,0,0,0,1.42,0l3-3A1,1,0,1,0,14.29,7L12,9.34,9.71,7A1,1,0,1,0,8.29,8.46Zm3,1.08L12,14.84l-2.29-2.3A1,1,0,0,0,8.29,14l3,3a1,1,0,0,0,1.42,0l3-3a1,1,0,0,0-1.42-1.42Z"></path></svg>
                            </button>
                        </div>
                    </motion.section>
                </div>

                {/* 소개 */}
                <div id="info">
                    <motion.section
                        className="bg-gray-50 p-8 rounded-xl"
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                    >
                        <h3 className="text-2xl mb-6 flex items-center">
                            <span className="text-rose-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg></span>
                            ANA는?
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700">
                            ANA는 Algorithm and Application의 약자로,<br />
                            <span className="bg-teal-100 px-1 text-teal-800 rounded">알고리즘</span>과
                            <span className="bg-teal-100 px-1 text-teal-800 rounded">문제 해결 능력</span>으로
                            세상의 문제를 해결하는 동아리입니다.
                        </p>
                    </motion.section>
                </div>

                {/* 주요 활동 */}
                <section id="activities">
                    <motion.h3
                        className="text-2xl mb-8 flex items-center"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.3 }}
                    >
                        <span className="text-rose-600 mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"></path></svg>
                        </span>
                        주요 활동
                    </motion.h3>
                    <motion.div
                        className="grid gap-5"
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={stagger}
                    >
                        {activities.map((item, idx) => (
                            <motion.div
                                key={idx} variants={fadeInUp}
                                className={`p-6 rounded-xl bg-base-100 shadow-sm`}
                            >
                                <h4 className={`text-xl text-indigo-600 mb-2`}>{item.title}</h4>
                                <p className="text-gray-700 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 친목 */}
                <div id="culture">
                    <motion.section
                        className="bg-gradient-to-bl from-indigo-600 to-purple-600 rounded-xl p-8 text-white text-center"
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                    >
                        <h3 className="text-2xl mb-4">공부만 하나요? 🤔</h3>
                        <p className="text-lg mb-6 opacity-90">그럴 리가요! 놀 땐 확실히 놀야요.</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {["개강총회/종강총회", "막걸리 동산", "동아리 MT", "풋살"].map((tag, i) => (
                                <span key={i} className="badge bg-base-100/90">{tag}</span>
                            ))}
                        </div>
                        <p className="text-sm mt-3 opacity-90">등등 대학 생활을 즐길 수 있는 행사들이 있어요.</p>
                    </motion.section>
                </div>

                {/* 자주 묻는 질문 */}
                <div id="faq">
                    <motion.section
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                    >
                        <h3 className="text-2xl mb-6 flex items-center">
                            <span className="text-rose-600 mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M6.29,10.3a1,1,0,0,0,1.09,1.63,1.19,1.19,0,0,0,.33-.22,1,1,0,0,0,.21-.32A.85.85,0,0,0,8,11a1,1,0,0,0-.29-.7A1,1,0,0,0,6.29,10.3ZM7,5A1,1,0,0,1,7,7,1,1,0,0,0,7,9,3,3,0,1,0,4.4,4.5a1,1,0,0,0,.37,1.37A1,1,0,0,0,6.13,5.5,1,1,0,0,1,7,5ZM19,6H13a1,1,0,0,0,0,2h6a1,1,0,0,1,1,1v9.72l-1.57-1.45a1,1,0,0,0-.68-.27H9a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v1a3,3,0,0,0,3,3h8.36l3,2.73A1,1,0,0,0,21,22a1.1,1.1,0,0,0,.4-.08A1,1,0,0,0,22,21V9A3,3,0,0,0,19,6Z"></path></svg>
                            </span>
                            자주 묻는 질문
                        </h3>
                        <div className="join join-vertical w-full bg-white border border-gray-200 rounded-xl">
                            <div className="collapse collapse-plus join-item">
                                <input type="radio" name="faq" defaultChecked />
                                <div className="collapse-title text-lg">코딩이 처음이에요ㅜㅜ</div>
                                <div className="collapse-content text-gray-600"><p>입문자 교육부터 알고리즘 교육까지 다양하게 준비되어 있어요! 그리고 저희 동아리엔 코딩 고수들도 잔뜩 있으니 걱정 안하셔도 돼요.🔥</p></div>
                            </div>
                            <div className="collapse collapse-plus join-item">
                                <input type="radio" name="faq" />
                                <div className="collapse-title text-lg">비전공자도 되나요?</div>
                                <div className="collapse-content text-gray-600"><p>물론입니다! 충남대 모든 학과 모든 학년이 가입 가능해요! 기초부터 친절히 알려드릴게요.☺️</p></div>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* 입부 신청 */}
                <div id="apply">
                    <motion.section
                        className="text-center"
                        initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: false, amount: 0.3 }}
                    >
                        <div className="p-10 rounded-xl bg-gradient-to-bl from-rose-600 via-indigo-600 to-teal-600 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-3xl mb-4">지금 신청하세요!</h3>
                                <a
                                    href="https://forms.gle/8ooRgmh5UbdV7hQS9"
                                    className="inline-flex items-center bg-white text-indigo-700 text-lg py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform"
                                >
                                    입부 신청 하러가기
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6 ml-1'><path d="M20.67,9.69,14,5.84a2.67,2.67,0,0,0-4,2.31h0L6,5.84A2.67,2.67,0,0,0,2,8.15v7.7a2.63,2.63,0,0,0,1.33,2.3,2.61,2.61,0,0,0,1.34.37A2.69,2.69,0,0,0,6,18.16l4-2.31h0a2.65,2.65,0,0,0,1.33,2.31,2.66,2.66,0,0,0,2.67,0l6.67-3.85a2.67,2.67,0,0,0,0-4.62ZM10,13.54,5,16.42a.67.67,0,0,1-1-.57V8.15a.67.67,0,0,1,1-.57l5,2.88Zm9.67-1L13,16.43a.69.69,0,0,1-.67,0,.66.66,0,0,1-.33-.58V8.15a.66.66,0,0,1,.33-.58.78.78,0,0,1,.34-.09.63.63,0,0,1,.33.09l6.67,3.85a.67.67,0,0,1,0,1.16Z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </motion.section>
                </div>

                {/* 문의처 */}
                <div id="contact">
                    <motion.section
                        className="bg-gray-50 p-8 rounded-xl"
                        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                    >
                        <h3 className="text-2xl mb-6">문의처</h3>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-rose-600"><path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg>
                                <a href="https://instagram.com/cnu_ana_official" className="underline">@cnu_ana_official</a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-rose-600"><path d="M20.46,9.63A8.5,8.5,0,0,0,7.3,3.36,8.56,8.56,0,0,0,3.54,9.63,8.46,8.46,0,0,0,6,16.46l5.3,5.31a1,1,0,0,0,1.42,0L18,16.46A8.46,8.46,0,0,0,20.46,9.63ZM16.6,15.05,12,19.65l-4.6-4.6A6.49,6.49,0,0,1,5.53,9.83,6.57,6.57,0,0,1,8.42,5a6.47,6.47,0,0,1,7.16,0,6.57,6.57,0,0,1,2.89,4.81A6.49,6.49,0,0,1,16.6,15.05ZM12,6a4.5,4.5,0,1,0,4.5,4.5A4.51,4.51,0,0,0,12,6Zm0,7a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,12,13Z"></path></svg>
                                <span>공대 5호관 315호</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <p className="flex justify-between text-gray-700">
                                    <span>회장 황현석</span> <a href="tel:01031540982">010-3154-0982</a>
                                </p>
                                <p className="flex justify-between text-gray-700 mt-2">
                                    <span>부회장 박종현</span> <a href="tel:01032504532">010-3250-4532</a>
                                </p>
                            </div>
                        </div>
                    </motion.section>
                </div>

            </div>
        </div>
    );
};

export default Recruit;