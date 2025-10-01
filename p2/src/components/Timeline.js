import React from 'react';
import TimelineItem from './TimelineItem';

const Timeline = ({ experience, activeJobIndex, setActiveJobIndex }) => (
    <section id="timeline" className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-slate-800">Career Timeline</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            Explore the chronological growth of my career. Each step highlights key leadership and technical achievements. Click on any role to see the detailed contributions and the <strong>quantifiable impact</strong> I delivered.
        </p>
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-300"></div>
            <div id="timeline-container" className="space-y-12">
                {experience.map((job, index) => (
                    <TimelineItem 
                        key={index}
                        job={job}
                        index={index}
                        activeIndex={activeJobIndex}
                        onClick={setActiveJobIndex}
                    />
                ))}
            </div>
        </div>
    </section>
);

export default Timeline;
