import React, { useState, useEffect } from 'react';

import Intro from './Intro';
import Activities from './Activities';
import Members from './Members'

interface Section {
    id: string;
    title: string;
    color: string;
    items: {
        id: string;
        title: string;
    }[]
}

const sections: Section[] = [
    {
        id: 'intro',
        title: '동아리 소개',
        color: 'text-teal-600 border-teal-600',
        items: [
            { id: 'intro-video', title: '소개 영상' },
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

const About: React.FC = () => {
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






