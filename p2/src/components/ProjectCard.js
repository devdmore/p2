import React from 'react';

const ProjectCard = ({ project }) => (
    <div 
        className="project-card bg-white p-6 rounded-2xl shadow-lg transition-transform duration-500 hover:shadow-xl hover:-translate-y-1"
    >
        <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
        <p className="text-slate-600 mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
        </div>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-700 transition-colors">View Project
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
    </div>
);

export default ProjectCard;
