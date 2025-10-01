import React from 'react';
import SkillsOrbit from './SkillsOrbit';

const Skills = ({ skills, activeSkillCategories, setActiveSkillCategories }) => (
    <section id="skills" className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-slate-800">Skills Showcase</h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16">
            This dynamic visualization groups my expertise into core competency areas, illustrating how my skills interoperate and orbit around core architectural principles. **Drag to rotate, pinch/scroll to zoom, and click the category tabs below to filter the visualization!**
        </p>
        <SkillsOrbit
            data={skills}
            activeCategories={activeSkillCategories}
            setActiveCategories={setActiveSkillCategories}
        />
    </section>
);

export default Skills;
