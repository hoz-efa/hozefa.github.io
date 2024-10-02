// Theme toggle functionality
const storageKey = 'theme-preference';

const theme = {
    value: getColorPreference(),
};

function getColorPreference() {
    if (localStorage.getItem(storageKey)) {
        return localStorage.getItem(storageKey);
    } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    }
}

function setPreference() {
    localStorage.setItem(storageKey, theme.value);
    reflectPreference();
}

function reflectPreference() {
    document.firstElementChild.setAttribute('data-theme', theme.value);
    document.querySelector('#theme-toggle')?.setAttribute('aria-label', theme.value);
}

function onClick() {
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light';

    setPreference();
}

// Content for different sections
const content = {
    projects: `
        <section id="projects" class="content-section">
            <h2>Projects</h2>
            <div class="projects-grid">
                <div class="project-card card" data-project-id="project1">
                    <img src="assets/images/projects/faktible.jpg" alt="Faktible">
                    <h3>Faktible</h3>
                    <p>A web application simplifying the process of quoting hardware</p>
                </div>
                <div class="project-card card" data-project-id="project2">
                    <img src="assets/images/projects/adoplastic.jpg" alt="Adoplastic">
                    <h3>Adoplastic</h3>
                    <p>A real-world company website including quote functionality for booking</p>
                </div>
                <div class="project-card card" data-project-id="project3">
                    <img src="assets/images/projects/adoplastic.jpg" alt="Xyz">
                    <h3>Xyz</h3>
                    <p>A real-world company website including quote functionality for booking</p>
                </div>
            </div>
        </section>
    `,
    experience: `
        <section id="experience" class="content-section">
            <h2>Experience</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-content card">
                        <h3>Front-end Developer @ Never8</h3>
                        <span>Feb 2022 - July 2023</span>
                        <p>Maintained and developed new features for a React.js project. Worked on improving the user interface and experience, implementing responsive designs, and optimizing performance.</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-content card">
                        <h3>Front-end Developer @ EDteam</h3>
                        <span>June 2021 - Feb 2022</span>
                        <p>Developed and maintained web apps using Next.js and TypeScript. Collaborated with the design team to implement user-friendly interfaces and ensure cross-browser compatibility.</p>
                    </div>
                </div>
            </div>
        </section>
    `,
    education: `
        <section id="education" class="content-section">
            <h2>Education</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-content card">
                        <h3>Self-Taught Developer</h3>
                        <span>2019 - Present</span>
                        <p>Focused on web technologies, particularly in JavaScript frameworks. Completed numerous online courses and personal projects to hone skills in front-end development.</p>
                    </div>
                </div>
            </div>
        </section>
    `,
    skills: `
        <section id="skills" class="content-section">
            <h2>Skills</h2>
            <div class="skills-category">
                <h3>Frontend Skills</h3>
                <ul>
                    <li>JavaScript</li>
                    <li>React.js</li>
                    <li>Next.js</li>
                    <li>HTML5</li>
                    <li>CSS3</li>
                </ul>
            </div>
            <div class="skills-category">
                <h3>Technical Skills</h3>
                <ul>
                    <li>TypeScript</li>
                    <li>Node.js</li>
                    <li>TailwindCSS</li>
                    <li>Git</li>
                    <li>RESTful APIs</li>
                </ul>
            </div>
            <div class="skills-category">
                <h3>Soft Skills</h3>
                <ul>
                    <li>Teamwork</li>
                    <li>Problem-solving</li>
                    <li>Communication</li>
                    <li>Time Management</li>
                    <li>Adaptability</li>
                </ul>
            </div>
        </section>
    `,
    contact: `
        <section id="contact" class="content-section">
            <h2>Contact Me</h2>
            <!-- Tally.so form embed -->
            <iframe data-tally-src="https://tally.so/embed/mOJXgp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="228" frameborder="0" marginheight="0" marginwidth="0" title="Contact Form"></iframe>
            
            <div id="formResponse" class="popup-box" style="display:none;">
                <span id="responseMessage"></span>
            </div>
    
            <div class="schedule-meeting">
                <a href="https://calendly.com/hozefapatel1999" target="_blank">Schedule a Meeting</a>
            </div>
        </section>
    `,
};

// Project data
const projectData = {
    project1: {
        title: 'Faktible',
        image: 'assets/images/projects/faktible.jpg',
        description: 'A web application simplifying the process of quoting hardware. It streamlines the quoting process, making it easier for businesses to provide accurate and timely quotes to their customers.',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        liveLink: '#',
        repoLink: '#',
    },
    project2: {
        title: 'Adoplastic',
        image: 'assets/images/projects/adoplastic.jpg',
        description: 'A real-world company website including quote functionality for booking. This project showcases the ability to create a professional, functional website that meets specific business needs.',
        technologies: ['Next.js', 'Tailwind CSS'],
        liveLink: '#',
        repoLink: '#',
    },
    project3: {
        title: 'Xyz',
        image: 'assets/images/projects/adoplastic.jpg',
        description: 'Another real-world company website with advanced features. This project demonstrates the ability to handle complex requirements and deliver a polished end product.',
        technologies: ['React', 'Redux', 'Node.js'],
        liveLink: '#',
        repoLink: '#',
    },
};

// Function to open project modal
function openProjectModal(projectId) {
    const projectDetails = projectData[projectId];
    if (projectDetails) {
        document.getElementById('modal-content').innerHTML = `
            <h2>${projectDetails.title}</h2>
            <img src="${projectDetails.image}" alt="${projectDetails.title}">
            <p>${projectDetails.description}</p>
            <h3>Technologies Used:</h3>
            <ul>
                ${projectDetails.technologies.map((tech) => `<li>${tech}</li>`).join('')}
            </ul>
            <a href="${projectDetails.liveLink}" target="_blank">View Live</a>
            <a href="${projectDetails.repoLink}" target="_blank">View Repository</a>
        `;
        document.getElementById('project-modal').classList.add('active');
        document.getElementById('modal-overlay').classList.add('active');
        document.body.classList.add('modal-active');
    }
}

// Function to close project modal
function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.classList.remove('modal-active');
}

// Function to show popup messages
function showPopup(message, type) {
    const responseBox = document.querySelector("#formResponse");
    const responseMessage = document.querySelector("#responseMessage");

    responseMessage.textContent = message;
    responseMessage.style.color = (type === 'success') ? 'green' : 'red';
    responseBox.style.display = 'block';

    setTimeout(() => {
        responseBox.style.display = 'none'; // Hide the popup after 4 seconds
    }, 4000);
}

// Main onload function (only one)
window.onload = function() {
    // Load the Tally.so embed script dynamically
    var script = document.createElement('script');
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = function() {
        console.log("Tally.so form script loaded successfully");
    };

    script.onerror = function() {
        console.log("Error loading Tally.so form script");
    };

    // Set theme on load for screen readers
    reflectPreference();

    // Theme toggle event listener
    document.querySelector('#theme-toggle').addEventListener('click', onClick);

    // Navigation menu event listeners
    document.querySelectorAll('.menu-item').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.menu-item').forEach((el) => el.classList.remove('active'));
            this.classList.add('active');
            const section = this.getAttribute('data-section');
            document.getElementById('main-content').innerHTML = content[section];
        });
    });

    // Initially load "Projects" section
    document.getElementById('main-content').innerHTML = content['projects'];

    // Project modal functionality
    document.addEventListener('click', function (e) {
        if (e.target && (e.target.matches('.project-card') || e.target.closest('.project-card'))) {
            const projectCard = e.target.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project-id');
            openProjectModal(projectId);
        }

        if (e.target && (e.target.matches('.close-button') || e.target.matches('.modal-overlay'))) {
            closeProjectModal();
        }

        // Close modal if click outside modal-content
        if (e.target.matches('.modal') && !e.target.closest('.modal-content')) {
            closeProjectModal();
        }
    });

    // Close modal on 'Esc' key press
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('modal-active')) {
            closeProjectModal();
        }
    });

    // Listen for the Tally form submission event
    window.addEventListener("message", function(event) {
        if (event.data === 'tally:form-submitted') {
            showPopup('✔️ Your message has been sent successfully!', 'success');
        }
    });
};

// Sync with system changes (Theme switching logic)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
});
