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
    theme.value = theme.value === 'light' ? 'dark' : 'light';
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
            <!-- Web3Forms form -->
            <form id="contactForm" action="https://api.web3forms.com/submit" method="POST" class="contact-form card">
                <!-- Hidden fields for Web3Forms -->
                <input type="hidden" name="access_key" value="c79992af-9148-4bcd-aa1f-4376fe48eb64">
                <input type="hidden" name="_captcha" value="false">

                <!-- Input fields -->
                <input type="email" name="email" placeholder="Your Email" required>
                <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
                <button type="submit">Send Message</button>
            </form>

            <!-- Popup for form response -->
            <div id="formResponse" class="popup-box">
                <div id="responseMessage"></div>
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

    // Clear previous content
    responseMessage.innerHTML = '';

    // Create HTML for icon
    let iconHtml = '';
    if (type === 'success') {
        iconHtml = `
        <svg class="popup-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M17.707,9.707l-7,7 C10.512,16.902,10.256,17,10,17s-0.512-0.098-0.707-0.293l-3-3c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L10,14.586 l6.293-6.293c0.391-0.391,1.023-0.391,1.414,0S18.098,9.316,17.707,9.707z"></path>
        </svg>
        `;
    } else {
        iconHtml = `
        <svg class="popup-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,2C6.47,2,2,6.47,2,12c0,5.53,4.47,10,10,10s10-4.47,10-10C22,6.47,17.53,2,12,2z M16.707,15.293 c0.391,0.391,0.391,1.023,0,1.414C16.512,16.902,16.256,17,16,17s-0.512-0.098-0.707-0.293L12,13.414l-3.293,3.293 C8.512,16.902,8.256,17,8,17s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L7.293,8.707 c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0L12,10.586l3.293-3.293c0.391-0.391,1.023-0.391,1.414,0 s0.391,1.023,0,1.414L13.414,12L16.707,15.293z"></path>
        </svg>
        `;
    }

    // Combine icon and message in the new structure
    responseMessage.innerHTML = `
        <div class="popup-icon">${iconHtml}</div>
        <div class="popup-message">${message}</div>
    `;

    // Set the appropriate class for styling
    responseBox.className = `popup-box ${type}`;

    // Show the popup
    responseBox.classList.add('show');

    setTimeout(() => {
        responseBox.classList.remove('show');
    }, 4500);
}

// Function to set up the contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status === 200) {
                        showPopup('Your message has been sent successfully!', 'success');
                        contactForm.reset();
                    } else {
                        console.log(json);
                        showPopup('Something went wrong, please try again.', 'error');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showPopup('Something went wrong, please try again.', 'error');
                });
        });
    }
}

// Main onload function
window.onload = function () {
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

            // If the section is 'contact', set up the form event listener
            if (section === 'contact') {
                setupContactForm();
            }

            // Re-initialize project modal functionality when loading projects
            if (section === 'projects') {
                initializeProjectCards();
            }
        });
    });

    // Initially load "Projects" section
    document.getElementById('main-content').innerHTML = content['projects'];

    // Initialize project modal functionality
    initializeProjectCards();
};

// Function to initialize project card click events
function initializeProjectCards() {
    document.querySelectorAll('.project-card').forEach((card) => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });
}

// Project modal functionality
document.addEventListener('click', function (e) {
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

// Sync with system changes (Theme switching logic)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
});
