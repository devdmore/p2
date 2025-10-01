import React from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ projects, activeFilter, setActiveFilter, allTags }) => {

    const filteredProjects = projects.filter(project => 
        activeFilter === 'all' || project.tags.includes(activeFilter)
    );

    return (
        <section id="projects" className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-slate-800 dark:text-slate-200">Project Gallery</h2>
            <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16 dark:text-slate-400">
                A selection of high-impact projects across FinTech and E-commerce. Use the filters to focus on the technologies and domains most relevant to your needs.
            </p>
            {/* Filter buttons */}
            <div id="project-filters" className="flex flex-wrap justify-center gap-2 mb-8">
                <button 
                    onClick={() => setActiveFilter('all')} 
                    className={`filter-btn px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${activeFilter === 'all' ? 'bg-cyan-600 text-white' : 'bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'}`} 
                    data-filter="all">
                    All Projects
                </button>
                {allTags.map(tag => (
                     <button 
                        key={tag}
                        onClick={() => setActiveFilter(tag)} 
                        className={`filter-btn px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${activeFilter === tag ? 'bg-cyan-600 text-white' : 'bg-white text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'}`} 
                        data-filter={tag}>
                        {tag}
                    </button>
                ))}
            </div>
            <div id="project-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Project Cards */}
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
