
const resumeData = {
    experience: [
        {
            company: "Persistent Systems",
            client: "Snap Finance",
            role: "Senior Frontend Lead",
            dates: "April 2022 – PRESENT",
            details: [
                "Mentored and guided a team of 4+ junior and mid-level developers, establishing best practices that significantly improved their feature implementation speed and code quality.",
                "Established the technical roadmap for the frontend team, successfully migrating critical components to modern React/Next.js architectures to ensure long-term reliability and scalability.",
                "Managed end-to-end project implementation—from initial scoping and planning through organized sprints—guaranteeing on-time and high-quality feature launches.",
                "Streamlined recruitment by conducting technical interviews, directly contributing to the hiring of high-performing engineers.",
                "Architected and built complex, multi-step financial application forms using Next.js and robust state management, minimizing user friction and ensuring strict data integrity.",
                "Improved application performance resulting in higher SEO ranking and better Core Web Vitals, making the site faster and more accessible for all users.",
                "Prototyped and assessed Headless CMS solutions (Sanity, Storyblok, Webflow) by creating quick Proof-of-Concepts (POCs), enabling the business to choose the most effective content management strategy.",
                "Served as the key technical liaison between the Frontend, API/Database, and UX/Design teams, translating high-level requirements into clear technical tasks and proactively resolving integration issues."
            ]
        },
        {
            company: "Virtusa Consulting Services",
            client: "Santander Bank",
            role: "Senior Consultant",
            dates: "August 2021 – March 2022",
            details: [
                "Led the frontend implementation of a micro-service-based banking application, ensuring multiple teams delivered high-quality code within planned sprint cycles and release timelines.",
                "Designed and implemented comprehensive user authorization logic for both admin and non-admin interfaces, restricting access based on criteria like department and geography to ensure regulatory compliance.",
                "Spearheaded architectural discussions to integrate ReactJS, Redux, and Material UI with multiple domain applications and messaging queues.",
                "Collaborated closely with stakeholders to gather functional requirements, translate them into technical specifications, and manage the full development lifecycle."
            ]
        },
         {
            company: "Code Raft Solutions Pvt. Ltd",
            client: "peachmode.com",
            role: "Senior Developer",
            dates: "September 2018 – July 2021",
            details: [
                 "Significantly optimized performance by refactoring and reducing existing JavaScript code on critical user flows (Address and Payment pages) of the e-commerce platform (peachmode.com).",
                 "Owned the payment integration overhaul, recreating the entire payment method section and integrating payment gateways like Razorpay with seamless, reliable JavaScript handling.",
                 "Developed and launched the Gift Card functionality, creating a new revenue stream for the e-commerce business.",
                 "Contributed to the Admin Panel development using Vue.js."
            ]
        },
         {
            company: "Oh2Two Media",
            role: "Senior Developer",
            dates: "November 2015 – August 2018",
            details: [
                "Managed the frontend team's workload, assigning tasks and providing technical guidance to ensure quality deliverables.",
                "Visualized and implemented new website features from scratch, ensuring cross-browser compatibility and working to improve page performance metrics."
            ]
        }
    ],
    skills: {
        "Core Frontend": ["React JS", "Next.js (App Router)", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS/SASS"],
        "Architecture & State": ["Micro-Frontend Arch.", "Redux Toolkit", "Form Management", "Code Splitting", "Lazy Loading"],
        "Performance & SEO": ["Scalability Optimization", "SEO Strategy", "Core Web Vitals"],
        "Advanced & Leadership": ["Generative AI", "LLM APIs (Vercel AI SDK)", "GShock Animation", "Project Management", "Team Mentorship"],
        "Tools & CMS": ["Git/GitHub", "VS Code", "Figma", "Material UI", "Storyblok", "Sanity", "Webflow", "Prismic"]
    },
    projects: [
         { name: "Snap Finance", desc: "Provider of point-of-sale and virtual rent-to-own ('vRTO') financing programs.", url: "https://snapfinance.com", tags: ["React", "Next.js", "FinTech"] },
         { name: "Peachmode.com", desc: "E-commerce application for online shopping of Indian ethnic wear.", url: "https://www.peachmode.com", tags: ["React", "E-commerce", "Vue.js"] },
         { name: "HDFC Bank SmartHub", desc: "Payment Management solution platform for merchants of all sizes.", url: "http://www.hdfcbank.com/smarthub/index.html", tags: ["JavaScript", "FinTech"] },
         { name: "HBL Global Course", desc: "Animated e-learning course developed for HBL Global employees.", url: "http://oh22works.com/HBL_new/course/", tags: ["Animation", "JavaScript"] }
    ]
};

export default resumeData;
