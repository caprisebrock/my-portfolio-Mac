'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
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
                I\'m a passionate beginner developer currently learning the fundamentals of web development. 
                I\'m focused on mastering HTML, CSS, and GitHub while exploring AI tools to enhance my workflow 
                and deliver better results for my freelance projects.
              </p>
              <p className="font-body">
                As I build my skills, I\'m excited to take on freelance opportunities that allow me to grow 
                while providing value to clients. I believe in continuous learning and staying up-to-date 
                with the latest tools and technologies that can improve my development process.
              </p>
              <div className="skills">
                <h3 className="font-heading">Skills I\'m Learning</h3>
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
    </main>
  );
} 