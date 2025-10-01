import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import CustomStyles from './components/CustomStyles';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import resumeData from './data/resumeData';

export default function App() {
    const [activeJobIndex, setActiveJobIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeSkillCategories, setActiveSkillCategories] = useState([]);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);
    
    const allTags = Array.from(new Set(resumeData.projects.flatMap(p => p.tags)));

    return (
        <>
            <CustomStyles />
            <Header />
            <main className="container mx-auto px-6 py-12">
                <Hero />
                <Timeline 
                    experience={resumeData.experience} 
                    activeJobIndex={activeJobIndex} 
                    setActiveJobIndex={setActiveJobIndex} 
                />
                <Skills 
                    skills={resumeData.skills} 
                    activeSkillCategories={activeSkillCategories} 
                    setActiveSkillCategories={setActiveSkillCategories} 
                />
                <Projects 
                    projects={resumeData.projects} 
                    activeFilter={activeFilter} 
                    setActiveFilter={setActiveFilter} 
                    allTags={allTags} 
                />
                <Contact />
            </main>
            <Footer />
        </>
    );
}