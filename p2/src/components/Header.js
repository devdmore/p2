import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-extrabold text-slate-800 tracking-wider">
                    DM <span className="text-cyan-600">| LEAD</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#timeline" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium">Career Timeline</a>
                    <a href="#skills" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium">Skills Showcase</a>
                    <a href="#projects" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium">Project Gallery</a>
                    <a href="#contact" className="text-slate-600 hover:text-cyan-600 transition-colors duration-300 font-medium">Contact</a>
                </div>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-600 hover:text-cyan-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </nav>
            <div className={`md:hidden px-6 pb-4 flex flex-col space-y-2 bg-white shadow-inner transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
                <a href="#timeline" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300">Career Timeline</a>
                <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300">Skills Showcase</a>
                <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300">Project Gallery</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-slate-600 hover:text-cyan-600 transition-colors duration-300">Contact</a>
            </div>
        </header>
    );
};

export default Header;
