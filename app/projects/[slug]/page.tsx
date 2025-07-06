'use client';

import { notFound } from 'next/navigation';
import projects from '../../../data/projects.json';
import { Project } from '../../../types';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

interface Params { params: { slug: string } }

export default function ProjectPage({ params }: Params) {
  const project = (projects as Project[]).find(p => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <>
      <Head>
        <title>{project.title} | Caprise Brock</title>
        <meta name="description" content={project.shortDescription} />
      </Head>
      <main className="max-w-4xl mx-auto p-8 bg-black text-white">
        <h1 className="font-heading text-4xl mb-4">{project.title}</h1>
        <Image src={project.image} alt={project.title} width={800} height={450} className="rounded-lg mb-6" />
        <p className="font-body text-gray-400 mb-6">{project.longDescription}</p>
        <div className="mb-6">
          <h2 className="font-heading text-2xl mb-2">Technologies Used</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <li key={tech} className="bg-gray-700 text-white px-3 py-1 rounded-full font-body text-sm">{tech}</li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-body">Live Demo</a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" className="border border-gray-700 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-body">View Code</a>
          )}
          <Link href="/" className="text-gray-400 hover:text-white font-body ml-auto">
            ← Back to Home
          </Link>
        </div>
      </main>
    </>
  );
} 