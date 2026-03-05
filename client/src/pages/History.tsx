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
        year: 2018,
        events: [
            { date: '2018.01', content: '창립 (ANT와 Almighty 통합)' },
        ]
    }
]

const History: React.FC = () => {

    return (
        <div className="container mx-auto max-w-4xl p-8">
            <h2 className="text-4xl font-bold mb-8 text-primary text-center font-mulmaru">ANA History</h2>

            <div className='bg-base-100 p-4 rounded-md'>
                <ul className="timeline timeline-vertical">
                    {timeline.map((tl) => (
                        <>
                            {tl.events.map((event) => (
                                <li>
                                    <hr />
                                    <div className='timeline-middle'>
                                        <div className='bg-secondary rounded-full w-1 h-1' />
                                    </div>
                                    <div className='timeline-end timeline-box ml-2'><span className='badge badge-secondary badge-outline mr-2'>{event.date}</span>{event.content}</div>
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
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default History;