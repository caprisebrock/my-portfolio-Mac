'use client';

import MobileNav from './components/MobileNav';
import ChatWidget from './components/ChatWidget';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import projects from '../data/projects.json';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <MobileNav />

      {/* Home Section */}
      <section id="home" className="hero bg-black">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title text-white font-heading">Hi, I'm <span className="highlight font-heading">Caprise Brock</span></h1>
            <p className="hero-subtitle text-gray-400 font-body">Full Stack Developer & Designer</p>
            <p className="hero-description text-gray-400 font-body">
              I'm a developer who turns ideas into websites. 
              Passionate about clean code and innovative solutions.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary bg-gray-800 text-white border border-gray-700 hover:bg-gray-700">View My Work</a>
              <a href="#contact" className="btn btn-secondary bg-gray-800 text-white border border-gray-700 hover:bg-gray-700">Get In Touch</a>
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
      <motion.section
        id="about"
        className="about bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container">
          <h2 className="section-title text-white font-heading">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="font-body">
                I'm a passionate beginner developer currently learning the fundamentals of web development. 
                I'm focused on mastering HTML, CSS, and GitHub while exploring AI tools to enhance my workflow 
                and deliver better results for my freelance projects.
              </p>
              <p className="font-body">
                As I build my skills, I'm excited to take on freelance opportunities that allow me to grow 
                while providing value to clients. I believe in continuous learning and staying up-to-date 
                with the latest tools and technologies that can improve my development process.
              </p>
              <div className="skills">
                <h3 className="font-heading">Skills I'm Learning</h3>
                <div className="skills-grid">
                  <div className="skill-category">
                    <h4 className="font-heading">Web Development</h4>
                    <ul>
                      <li>HTML5</li>
                      <li>CSS3</li>
                      <li>Responsive Design</li>
                      <li>Git & GitHub</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h4 className="font-heading">Tools & Platforms</h4>
                    <ul>
                      <li>GitHub Pages</li>
                      <li>VS Code</li>
                      <li>AI Development Tools</li>
                      <li>Freelance Platforms</li>
                    </ul>
                  </div>
                  <div className="skill-category">
                    <h4 className="font-heading">Soft Skills</h4>
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
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-16 bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-10 text-center font-heading">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <a className="block bg-gray-800 rounded-xl p-6 hover:scale-105 transition">
                  <h3 className="font-heading text-xl text-white">{project.title}</h3>
                  <p className="font-body text-gray-400">{project.shortDescription}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="contact bg-black"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container">
          <h2 className="section-title text-white font-heading">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="font-heading">Let's work together!</h3>
              <p className="font-body">
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
              <button type="submit" className="btn btn-primary bg-gray-800 text-white border border-gray-700 hover:bg-gray-700">Send Message</button>
            </form>
          </div>
        </div>
      </motion.section>

      <ChatWidget />
    </>
  );
} 