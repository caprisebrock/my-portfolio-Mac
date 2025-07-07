'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import projects from '../../data/projects.json';

export default function ProjectsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
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
              <Link key={project.slug} href={`/projects/${project.slug}`} className="block bg-gray-800 rounded-xl p-6 hover:scale-105 transition">
                <h3 className="font-heading text-xl text-white">{project.title}</h3>
                <p className="font-body text-gray-400">{project.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  );
} 