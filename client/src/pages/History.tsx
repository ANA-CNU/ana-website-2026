import React from 'react';

interface Event {
    date: string;
    content: string;
}

interface Timeline {
    year: number;
    events: Event[];
}

const timeline: Timeline[] = [
    {
        year: 2026,
        events: [
            { date: '2026.01', content: 'ANIGMA 대회 개최' },
            { date: '2026.01', content: '임원진 선발 (회장: 황현석, 부회장: 박종현)' },
        ]
    },
    {
        year: 2025,
        events: [
            { date: '2025.09', content: 'SW-IT CONTEST 대회 개최' },
            { date: '2025.05', content: 'ANAGETDON 대회 개최' },
            { date: '2025.01', content: '임원진 선발 (회장: 양영우, 부회장: 정민용)' },
        ]
    },
    {
        year: 2024,
        events: [
            { date: '2024.09', content: 'SW-IT CONTEST 대회 개최' },
            { date: '2024.01', content: '임원진 선발 (회장: 안우진 부회장: 최예은)' }
        ]
    },
    {
        year: 2023,
        events: [
            { date: '2023.09', content: 'SW-IT CONTEST 대회 개최' },
            { date: '2023.01', content: '임원진 선발 (회장: 김시온 부회장: 안유진)' }
        ]
    },
    {
        year: 2022,
        events: [
            { date: '2022.09', content: 'SW-IT CONTEST 대회 개최' },
            { date: '2022.01', content: '임원진 선발 (회장: 신동훈, 부회장: 정재헌)' }
        ]
    },
    {
        year: 2021,
        events: [
            { date: '2021.09', content: '제 5회 생각하는 프로그래밍 대회 개최' },
            { date: '2021.01', content: '임원진 선발 (회장: 복신영, 부회장: 최민우)' }
        ]
    },
    {
        year: 2018,
        events: [
            { date: '2018.09', content: '제 2회 생각하는 프로그래밍 대회 개최' },
            { date: '2018.01', content: '창립 (ANT와 Almighty 통합)' }
        ]
    },
]

const History: React.FC = () => {

    return (
        <div className="container mx-auto max-w-4xl p-8">
            <h2 className="text-4xl font-bold mb-8 text-primary text-center font-mulmaru">ANA History</h2>

            <div className='bg-base-100 p-4 rounded-md'>
                <ul className="timeline timeline-vertical">
                    {timeline.map((tl, idx) => {
                        if (idx % 2 == 0) {
                            return (
                                <>
                                    {tl.events.map((event) => (
                                        <li>

                                            <hr />

                                            <div className='timeline-middle'>
                                                <div className='bg-secondary rounded-full w-1 h-1' />
                                            </div>

                                            <div className='timeline-start timeline-box mr-2 flex flex-col md:flex-row justify-center items-end md:items-center'>
                                                {event.content}
                                                <span className='badge badge-secondary badge-outline md:ml-2'>{event.date}</span>
                                            </div>

                                            <hr />

                                        </li>
                                    ))}

                                    <li key={tl.year} >

                                        <hr />

                                        <div className="timeline-start text-3xl font-mulmaru mr-3">{tl.year}</div>

                                        <div className="timeline-middle rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="arrow-circle-up" className='fill-primary size-8'><path d="M12.71,8.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L11,11.41V15a1,1,0,0,0,2,0V11.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
                                        </div>

                                        <hr />

                                    </li>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    {tl.events.map((event) => (
                                        <li>

                                            <hr />

                                            <div className='timeline-middle'>
                                                <div className='bg-secondary rounded-full w-1 h-1' />
                                            </div>

                                            <div className='timeline-end timeline-box ml-2 flex flex-col md:flex-row justify-center items-start md:items-center'>
                                                <span className='badge badge-secondary badge-outline mr-2'>{event.date}</span>
                                                {event.content}
                                            </div>
                                            
                                            <hr />

                                        </li>
                                    ))}

                                    <li key={tl.year} >

                                        <hr />

                                        <div className="timeline-end text-3xl font-mulmaru mr-3">{tl.year}</div>

                                        <div className="timeline-middle rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="arrow-circle-up" className='fill-primary size-8'><path d="M12.71,8.29a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L11,11.41V15a1,1,0,0,0,2,0V11.41l1.29,1.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
                                        </div>

                                        <hr />

                                    </li>
                                </>
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default History;