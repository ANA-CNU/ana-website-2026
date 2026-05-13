import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, type Variants } from 'motion/react';

const sections = [
    { id: 'intro', title: '인트로' },
    { id: 'info', title: '소개' },
    { id: 'div', title: 'DIVISION' },
    { id: 'faq', title: '자주 묻는 질문' },
    { id: 'apply', title: '참가 신청' },
    { id: 'contact', title: '문의' },
];

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.25 } }
};

const Anagetdon2026: React.FC = () => {

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

    return <div className="w-full max-w-3xl mx-auto px-5 pb-50 font-mulmaru bg-base-200">

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
                        className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${activeId === section.id
                            ? 'bg-indigo-800 text-white shadow-md'
                            : 'bg-indigo-100 text-gray-500'
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
                    className="text-center py-10 px-5 bg-linear-to-bl from-indigo-900 via-slate-900 to-teal-900 rounded-lg"
                    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                >
                    <h2 className="text-6xl sm:text-7xl mb-6 bg-linear-to-bl from-orange-200 to-sky-200 bg-clip-text text-transparent">
                        ANAGETDON
                    </h2>
                    <p className="text-xl bg-linear-to-bl from-orange-200 to-sky-200 bg-clip-text text-transparent mb-8">
                        ANA에서 개최하는<br />팀 프로그래밍 대회
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            onClick={() => scrollToSection('apply')}
                            className="btn bg-slate-200 hover:bg-slate-100 text-slate-900 btn-lg px-10 text-lg border-none w-full sm:w-auto rounded-xl"
                        >
                            참가신청하기 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6 inline'><path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path></svg>
                        </button>
                        <button
                            onClick={() => scrollToSection('info')}
                            className="btn bg-slate-200 text-slate-900 btn-lg px-8 text-lg border border-gray-200 hover:bg-slate-100 w-full sm:w-auto rounded-xl"
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
                    className="bg-slate-50 p-8 rounded-lg"
                    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                >
                    <h3 className="text-2xl text-indigo-800 mb-6 flex items-center">
                        <span className="text-orange-600 mr-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path></svg></span>
                        ANAGETDON이란?
                    </h3>
                    <p className="text-lg leading-loose text-slate-800">
                        총 상금 <span className='text-orange-600 bg-orange-100 p-1'>240만원</span>!!<br />
                        ANAGETDON은 프로그래밍 경진 대회를 쉽게 <span className='text-orange-600 bg-orange-100 p-1'>입문</span>할 수 있도록 준비한 대회입니다.<br />
                        알고리즘을 잘 알지 못해도 <span className='text-orange-600 bg-orange-100 p-1'>팀워크와 프로그래밍 실력</span>만으로 해결할 수 있는 문제들이 출제되니 친구와 함께 부담없이 참여해주세요!
                    </p>
                </motion.section>
            </div>

            {/* DIVISION */}
            <section id="div">
                <motion.h3
                    className="text-2xl mb-8 flex items-center"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.3 }}
                >
                    <span className="text-orange-600 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"></path></svg>
                    </span>
                    DIVISION
                </motion.h3>
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={stagger}
                >
                    <div className="relative w-full h-72 overflow-hidden rounded-lg">
                        {/* div1 */}
                        <motion.div
                            variants={fadeInLeft}
                            className="flex flex-col justify-between items-start absolute inset-0 bg-linear-to-b from-indigo-900 via-slate-900 to-teal-900 p-3 sm:p-8 [clip-path:polygon(0_0,57%_0,37%_100%,0%_100%)]"
                        >
                            <p className="w-1/2 text-sm sm:text-lg text-orange-100/90 leading-loose">
                                전공자 1학년 & 비전공자 대상<br />
                                넌센스와 간단한 코딩 문제로 구성
                            </p>
                            <h2 className="text-4xl font-bold text-orange-100 mb-2">DIV1</h2>
                        </motion.div>

                        {/* div2 */}
                        <motion.div
                            variants={fadeInRight}
                            className="absolute inset-0 bg-linear-to-b from-indigo-900 via-slate-900 to-teal-900 p-3 sm:p-8 flex flex-col justify-between items-end [clip-path:polygon(63%_0,100%_0,100%_100%,43%_100%)]"
                        >
                            <h2 className="text-4xl font-bold text-sky-100 mb-2">DIV2</h2>
                            <p className="w-1/2 text-sm sm:text-lg text-sky-100/90 text-right leading-loose">
                                전공자 2학년 이상 대상<br />
                                고난도 알고리즘 문제로 구성
                            </p>
                        </motion.div>

                    </div>
                </motion.div>
            </section>

            {/* 자주 묻는 질문 */}
            <div id="faq">
                <motion.section
                    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                >
                    <h3 className="text-2xl mb-6 flex items-center">
                        <span className="text-orange-600 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-8'><path d="M6.29,10.3a1,1,0,0,0,1.09,1.63,1.19,1.19,0,0,0,.33-.22,1,1,0,0,0,.21-.32A.85.85,0,0,0,8,11a1,1,0,0,0-.29-.7A1,1,0,0,0,6.29,10.3ZM7,5A1,1,0,0,1,7,7,1,1,0,0,0,7,9,3,3,0,1,0,4.4,4.5a1,1,0,0,0,.37,1.37A1,1,0,0,0,6.13,5.5,1,1,0,0,1,7,5ZM19,6H13a1,1,0,0,0,0,2h6a1,1,0,0,1,1,1v9.72l-1.57-1.45a1,1,0,0,0-.68-.27H9a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v1a3,3,0,0,0,3,3h8.36l3,2.73A1,1,0,0,0,21,22a1.1,1.1,0,0,0,.4-.08A1,1,0,0,0,22,21V9A3,3,0,0,0,19,6Z"></path></svg>
                        </span>
                        자주 묻는 질문
                    </h3>
                    <div className='space-y-3'>
                        <div className="collapse collapse-plus bg-slate-100 border border-slate-300 rounded-lg">
                            <input type="radio" name="faq" defaultChecked />
                            <div className="collapse-title text-lg text-indigo-900">AI를 사용해도 되나요?</div>
                            <div className="collapse-content text-indigo-900/90"><p>생성형 AI 사용은 금지입니다. 대신 인터넷 검색은 자유롭게 가능해요🔍</p></div>
                        </div>
                        <div className="collapse collapse-plus bg-slate-100 border border-slate-300 rounded-lg">
                            <input type="radio" name="faq" />
                            <div className="collapse-title text-lg text-teal-900">비전공자도 참가되나요?</div>
                            <div className="collapse-content text-teal-900/90"><p>당연히 참가 가능합니다! DIV1에는 넌센스나 쉬운 코딩 문제가 준비되어있으니 부담없이 참가바랍니다🥵</p></div>
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
                    <div className="p-10 rounded-xl bg-linear-to-bl from-indigo-900 via-slate-900 to-teal-900 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-3xl mb-4">지금 참가하세요!</h3>
                            <Link
                                to="https://forms.gle/qK7KR5YZSwUUrGx9A"
                                className="inline-flex items-center bg-white text-indigo-700 text-lg py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                참가 신청 하러가기
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-current size-6 ml-1'><path d="M20.67,9.69,14,5.84a2.67,2.67,0,0,0-4,2.31h0L6,5.84A2.67,2.67,0,0,0,2,8.15v7.7a2.63,2.63,0,0,0,1.33,2.3,2.61,2.61,0,0,0,1.34.37A2.69,2.69,0,0,0,6,18.16l4-2.31h0a2.65,2.65,0,0,0,1.33,2.31,2.66,2.66,0,0,0,2.67,0l6.67-3.85a2.67,2.67,0,0,0,0-4.62ZM10,13.54,5,16.42a.67.67,0,0,1-1-.57V8.15a.67.67,0,0,1,1-.57l5,2.88Zm9.67-1L13,16.43a.69.69,0,0,1-.67,0,.66.66,0,0,1-.33-.58V8.15a.66.66,0,0,1,.33-.58.78.78,0,0,1,.34-.09.63.63,0,0,1,.33.09l6.67,3.85a.67.67,0,0,1,0,1.16Z"></path></svg>
                            </Link>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* 문의처 */}
            <div id="contact">
                <motion.section
                    className="bg-slate-100 p-8 rounded-xl"
                    initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={fadeInUp}
                >
                    <h3 className="text-2xl mb-6">문의처</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-orange-600"><path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"></path></svg>
                            <Link to="https://instagram.com/cnu_ana_official" className="underline text-slate-900/90">@cnu_ana_official</Link>
                        </div>
                        <div className="flex items-center space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-orange-600"><path d="M20.46,9.63A8.5,8.5,0,0,0,7.3,3.36,8.56,8.56,0,0,0,3.54,9.63,8.46,8.46,0,0,0,6,16.46l5.3,5.31a1,1,0,0,0,1.42,0L18,16.46A8.46,8.46,0,0,0,20.46,9.63ZM16.6,15.05,12,19.65l-4.6-4.6A6.49,6.49,0,0,1,5.53,9.83,6.57,6.57,0,0,1,8.42,5a6.47,6.47,0,0,1,7.16,0,6.57,6.57,0,0,1,2.89,4.81A6.49,6.49,0,0,1,16.6,15.05ZM12,6a4.5,4.5,0,1,0,4.5,4.5A4.51,4.51,0,0,0,12,6Zm0,7a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,12,13Z"></path></svg>
                            <span className='text-slate-900/90'>공대 5호관 315호</span>
                        </div>
                        <div className="border-t border-slate-300 pt-4 mt-4">
                            <p className="flex justify-between text-slate-900">
                                <span>회장 황현석</span> <Link to="tel:01031540982">010-3154-0982</Link>
                            </p>
                            <p className="flex justify-between text-slate-900 mt-2">
                                <span>부회장 박종현</span> <Link to="tel:01032504532">010-3250-4532</Link>
                            </p>
                        </div>
                    </div>
                </motion.section>
            </div>


        </div>

    </div>
}

export default Anagetdon2026;