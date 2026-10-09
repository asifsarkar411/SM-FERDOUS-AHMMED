'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  _id?: string;
  company: string;
  role: string;
  location?: string;
  duration: string;
  isCurrent?: boolean;
  responsibilities: string[];
  techStack: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 sm:py-24 relative bg-slate-100/60 dark:bg-black/60 border-y border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Professional <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Demonstrated track record of delivering test frameworks, web reliability, and engineering support.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Guide Line */}
          <div className="hidden md:block absolute top-4 bottom-4 left-8 w-[2px] bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, idx) => (
              <div key={exp._id || idx} className="relative md:pl-20 group">
                {/* Timeline Node Dot */}
                <div className="hidden md:flex absolute left-[26px] top-6 w-3.5 h-3.5 rounded-full bg-white dark:bg-black border-2 border-cyan-500 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300 z-10 shadow-md shadow-cyan-500/40" />

                {/* Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 glass-panel-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-black/5 dark:border-white/5 pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold uppercase tracking-wider">
                            Present Role
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      Key Responsibilities & Deliverables:
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Chips */}
                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mr-1">Technologies:</span>
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
