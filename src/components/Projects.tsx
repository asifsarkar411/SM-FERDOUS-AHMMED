'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

interface ProjectItem {
  _id?: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  featured?: boolean;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category || 'General')))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => (p.category || 'General') === selectedCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            End-to-end automation suites, full-stack applications, and specialized developer utilities.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project._id || idx}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 glass-panel-hover flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image Container */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-transparent" />

                  {/* Top Bar on Image: Category Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                      {project.category || 'Featured Project'}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Top Pick
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-7 space-y-4">
                  <h3
                    onClick={() => setActiveModalProject(project)}
                    className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-800/80 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="px-6 py-4 border-t border-white/5 bg-slate-900/40 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <span>Details & Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/5 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      title="View Live Application"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-900">
              <Image
                src={activeModalProject.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'}
                alt={activeModalProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-cyan-400 border border-indigo-500/30">
                  {activeModalProject.category || 'Project'}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">
                {activeModalProject.title}
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line">
                <p>{activeModalProject.longDescription || activeModalProject.description}</p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-indigo-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md"
                  >
                    Live Demo
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
