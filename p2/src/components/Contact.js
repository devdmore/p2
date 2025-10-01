import React from 'react';

const Contact = () => (
    <section id="contact" className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800">Get In Touch</h2>
         <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
            I'm actively looking for ambitious projects and team opportunities. Let's connect to discuss how my 11+ years of frontend and leadership experience can benefit your organization.
        </p>
        <div className="bg-white p-8 rounded-2xl shadow-xl inline-flex flex-col items-center gap-4 border-t-4 border-cyan-500">
            <p className="text-lg text-slate-700">Mumbai, Maharashtra, 400067</p>
            <p className="text-xl font-medium text-slate-800">
                <a href="mailto:devd.more@gmail.com" className="text-cyan-600 hover:text-cyan-700 transition-colors">devd.more@gmail.com</a>
            </p>
            <p className="text-xl font-medium text-slate-800">
                <a href="tel:9768086490" className="text-cyan-600 hover:text-cyan-700 transition-colors">97680 86490</a>
            </p>
        </div>
    </section>
);

export default Contact;
