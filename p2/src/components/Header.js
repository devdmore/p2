import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 dark:bg-slate-900/95">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-slate-800 tracking-wider dark:text-white">
                    DM <span className="text-cyan-600">| LEAD</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#timeline" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium dark:text-slate-300 dark:hover:text-cyan-500">Career Timeline</a>
                    <a href="#skills" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium dark:text-slate-300 dark:hover:text-cyan-500">Skills Showcase</a>
                    <a href="#projects" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium dark:text-slate-300 dark:hover:text-cyan-500">Project Gallery</a>
                    <a href="#contact" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium dark:text-slate-300 dark:hover:text-cyan-500">Contact</a>
                    <button onClick={toggleTheme} className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-500">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
                <div className="flex md:hidden items-center">
                    <button onClick={toggleTheme} className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-500 mr-4">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600 hover:text-cyan-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </nav>
            <div className={`md:hidden px-6 pb-4 flex flex-col space-y-2 bg-white shadow-inner transition-all duration-300 ease-in-out dark:bg-slate-800 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <a href="#timeline" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300 dark:text-slate-300 dark:hover:text-cyan-500">Career Timeline</a>
                <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300 dark:text-slate-300 dark:hover:text-cyan-500">Skills Showcase</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300 dark:text-slate-300 dark:hover:text-cyan-500">Project Gallery</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300 dark:text-slate-300 dark:hover:text-cyan-500">Contact</a>
            </div>
        </header>
    );
};

export default Header;
