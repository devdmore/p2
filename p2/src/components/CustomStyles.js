import React from 'react';

const CustomStyles = () => (
    <style jsx="true">{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f1f5f9;
            color: #1e293b;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 9999px;
            background-color: white;
            border: 4px solid #06b6d4;
            top: 50%;
            left: -0.625rem;
            transform: translateY(-50%);
            z-index: 10;
            transition: all 0.3s ease;
        }
        .timeline-item.active::before {
             background-color: #06b6d4;
             transform: translateY(-50%) scale(1.2);
        }
    `}</style>
);

export default CustomStyles;
