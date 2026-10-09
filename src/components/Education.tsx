'use client';

import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

interface EducationItem {
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  passingYear: string;
  startYear?: string;
  results: string;
  description?: string;
}

interface EducationProps {
  educations: EducationItem[];
}

export default function Education({ educations }: EducationProps) {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Educational <span className="text-gradient-primary">Details</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Formal computer science training and academic achievements underpinning software craftsmanship.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educations.map((edu, idx) => (
            <div
              key={edu._id || idx}
              className="glass-card rounded-2xl p-7 sm:p-8 border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-white/5 text-xs font-mono text-slate-300">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      Class of {edu.passingYear}
                    </span>
                    {edu.results && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                        <Award className="w-3 h-3" />
                        {edu.results}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {edu.degree}
                  </h3>
                  {edu.fieldOfStudy && (
                    <p className="text-sm font-medium text-cyan-400 mt-0.5">
                      {edu.fieldOfStudy}
                    </p>
                  )}
                  <p className="text-sm text-slate-300 font-semibold mt-1">
                    {edu.institution}
                  </p>
                </div>

                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2 border-t border-white/5 flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{edu.description}</span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
