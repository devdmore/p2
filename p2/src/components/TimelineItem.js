import React from 'react';

const TimelineItem = ({ job, index, activeIndex, onClick }) => {
    const isActive = index === activeIndex;
    const timelineItemClass = `pl-10 relative timeline-item ${isActive ? 'active' : ''}`;

    return (
        <div 
            className={timelineItemClass}
        >
            <div 
                onClick={() => onClick(index)} 
                className="p-6 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300 dark:bg-slate-800 dark:hover:shadow-cyan-500/10"
            >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h3>
                <p className="text-cyan-600 font-semibold dark:text-cyan-500">{job.company} {job.client ? `(Client: ${job.client})` : ''}</p>
                <p className="text-sm text-slate-500 mb-4 dark:text-slate-400">{job.dates}</p>
                <div className={`details mt-4 space-y-2 text-slate-600 transition-all duration-300 ${isActive ? 'block' : 'hidden'} dark:text-slate-300`}>
                   <ul className="list-disc list-inside space-y-1 pl-4">
                       {job.details.map((d, i) => <li key={i}>{d}</li>)}
                   </ul>
                </div>
            </div>
        </div>
    );
};

export default TimelineItem;
