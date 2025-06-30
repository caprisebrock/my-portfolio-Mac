'use client';

import MobileNav from './components/MobileNav';
import ChatWindow from './components/ChatWindow';

export default function Home() {
  return (
    <>
      <MobileNav />
      
      {/* Home Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Hi, I'm <span className="highlight">Caprise Brock</span></h1>
            <p className="hero-subtitle">Full Stack Developer & Designer</p>
            <p className="hero-description">
              I'm a developer who turns ideas into websites. 
              Passionate about clean code and innovative solutions.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate beginner developer currently learning the fundamentals of web development. 
                I'm focused on mastering HTML, CSS, and GitHub while exploring AI tools to enhance my workflow 
                and deliver better results for my freelance projects.
              </p>
              <p>
                As I build my skills, I'm excited to take on freelance opportunities that allow me to grow 
                while providing value to clients. I believe in continuous learning and staying up-to-date 
                with the latest tools and technologies that can improve my development process.
              </p>
              <div className="skills">
                <h3>Skills I'm Learning</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h4>Web Development</h4>
                    <ul>
                      <li>HTML5</li>
                      <li>CSS3</li>
                      <li>Responsive Design</li>
                      <li>Git & GitHub</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h4>Tools & Platforms</h4>
                    <ul>
                      <li>GitHub Pages</li>
                      <li>VS Code</li>
                      <li>AI Development Tools</li>
                      <li>Freelance Platforms</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h4>Soft Skills</h4>
                    <ul>
                      <li>Client Communication</li>
                      <li>Project Management</li>
                      <li>Problem Solving</li>
                      <li>Continuous Learning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <i className="fas fa-laptop-code"></i>
                </div>
              </div>
              <div className="project-content">
                <h3>E-Commerce Platform</h3>
                <p>A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.</p>
                <div className="project-tech">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MongoDB</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                  <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <i className="fas fa-mobile-alt"></i>
                </div>
              </div>
              <div className="project-content">
                <h3>Task Management App</h3>
                <p>A responsive task management application with drag-and-drop functionality and real-time updates.</p>
                <div className="project-tech">
                  <span className="tech-tag">Vue.js</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">CSS3</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                  <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
              <div className="project-content">
                <h3>Data Visualization Dashboard</h3>
                <p>Interactive dashboard for data visualization with charts, filters, and real-time data updates.</p>
                <div className="project-tech">
                  <span className="tech-tag">D3.js</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Flask</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link"><i className="fab fa-github"></i> Code</a>
                  <a href="#" className="project-link"><i className="fas fa-external-link-alt"></i> Live</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together!</h3>
              <p>
                Available for freelance web projects. I'm excited to help bring your ideas to life 
                and create beautiful, functional websites that meet your needs.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>brockcaprise@gmail.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>Available upon request</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Remote / Worldwide</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-github"></i></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <ChatWindow />
    </>
  );
} 