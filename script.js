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
  document.documentElement.setAttribute('data-theme', theme.value);
  document.querySelectorAll('.theme-toggle').forEach((toggle) => {
    toggle.setAttribute('aria-label', theme.value);
  });
}

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
}

// Set early to avoid flash
reflectPreference();

window.onload = () => {
  // Event listeners for theme toggle buttons
  document.querySelectorAll('.theme-toggle').forEach((toggle) => {
    toggle.addEventListener('click', onClick);
  });

  // Event listeners for navigation menu items
  document.querySelectorAll('.menu-item').forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all menu items
      document
        .querySelectorAll('.menu-item')
        .forEach((el) => el.classList.remove('active'));

      // Add active class to clicked item
      this.classList.add('active');

      // Update main content with selected section
      const section = this.getAttribute('data-section');
      document.getElementById('main-content').innerHTML = content[section];

      // Scroll to top
      window.scrollTo(0, 0);
    });
  });

  // Initially load "Projects" section
  document.getElementById('main-content').innerHTML = content['projects'];

  // Project modal functionality
  document.addEventListener('click', function (e) {
    if (
      e.target &&
      (e.target.matches('.project-card') ||
        e.target.closest('.project-card'))
    ) {
      const projectCard = e.target.closest('.project-card');
      const projectId = projectCard.getAttribute('data-project-id');
      openProjectModal(projectId);
    }

    if (
      e.target &&
      (e.target.matches('.close-button') || e.target.matches('.modal-overlay'))
    ) {
      closeProjectModal();
    }
  });

  // Close modal on 'Esc' key press
  document.addEventListener('keydown', function (e) {
    if (
      e.key === 'Escape' &&
      document.body.classList.contains('modal-active')
    ) {
      closeProjectModal();
    }
  });
};

// Theme change listener
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light';
    setPreference();
  });

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
        <!-- Add more project cards as needed -->
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
            <p>Maintained and developed new features for a React.js project...</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content card">
            <h3>Front-end Developer @ EDteam</h3>
            <span>June 2021 - Feb 2022</span>
            <p>Developed and maintained web apps using Next.js and TypeScript...</p>
          </div>
        </div>
        <!-- Add more experience items as needed -->
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
            <p>Focused on web technologies, particularly in JavaScript frameworks...</p>
          </div>
        </div>
        <!-- Add more education items as needed -->
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
          <!-- Add more skills -->
        </ul>
      </div>
      <div class="skills-category">
        <h3>Technical Skills</h3>
        <ul>
          <li>TypeScript</li>
          <li>Node.js</li>
          <li>TailwindCSS</li>
          <!-- Add more skills -->
        </ul>
      </div>
      <div class="skills-category">
        <h3>Soft Skills</h3>
        <ul>
          <li>Teamwork</li>
          <li>Problem-solving</li>
          <li>Communication</li>
          <!-- Add more skills -->
        </ul>
      </div>
    </section>
  `,
  contact: `
    <section id="contact" class="content-section">
      <h2>Contact Me</h2>
      <form class="contact-form card">
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
      <div class="schedule-meeting">
        <a href="https://calendly.com/your-link" target="_blank">Schedule a Meeting</a>
      </div>
    </section>
  `,
};

// Function to open project modal
function openProjectModal(projectId) {
  // Get project details based on projectId
  const projectDetails = projectData[projectId];
  if (projectDetails) {
    document.getElementById('modal-content').innerHTML = `
      <h2>${projectDetails.title}</h2>
      <img src="${projectDetails.image}" alt="${projectDetails.title}">
      <p>${projectDetails.description}</p>
      <h3>Technologies Used:</h3>
      <ul>
        ${projectDetails.technologies
          .map((tech) => `<li>${tech}</li>`)
          .join('')}
      </ul>
      <a href="${projectDetails.liveLink}" target="_blank">View Live</a>
      <a href="${projectDetails.repoLink}" target="_blank">View Repository</a>
    `;
    document.getElementById('project-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');

    // Add 'modal-active' class to body to trigger blur effect
    document.body.classList.add('modal-active');
  }
}

// Function to close project modal
function closeProjectModal() {
  document.getElementById('project-modal').classList.remove('active');
  document.getElementById('modal-overlay').classList.remove('active');

  // Remove 'modal-active' class from body
  document.body.classList.remove('modal-active');
}

// Placeholder project data
const projectData = {
  project1: {
    title: 'Faktible',
    image: 'assets/images/projects/faktible.jpg',
    description:
      `A web application simplifying the process of quoting hardware...
      <br>
      Also it includes all the features
      `,
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    liveLink: '#',
    repoLink: '#',
  },
  project2: {
    title: 'Adoplastic',
    image: 'assets/images/projects/adoplastic.jpg',
    description:
      `A real-world company website including quote functionality...
      <br>
      also it include all the features like`,
    technologies: ['Next.js', 'Tailwind CSS'],
    liveLink: '#',
    repoLink: '#',
  },
  // Add more project data as needed
};
