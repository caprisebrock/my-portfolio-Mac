'use client';

import MobileNav from './components/MobileNav';
import ChatWidget from './components/ChatWidget';
import { motion } from 'framer-motion';
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
              <Link href="/contact" className="btn btn-secondary bg-gray-800 text-white border border-gray-700 hover:bg-gray-700">Get In Touch</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-placeholder">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </section>

      <ChatWidget />
    </>
  );
} 