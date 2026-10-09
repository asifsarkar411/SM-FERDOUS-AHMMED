'use client';

import React from 'react';
import {
  User,
  Award,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Flame,
  FileCheck
} from 'lucide-react';

interface AboutProps {
  profile: {
    name: string;
    aboutStory?: string;
    bio: string;
    location: string;
    metrics?: {
      yearsExperience?: string;
      completedProjects?: string;
      automatedTests?: string;
      contributions?: string;
    };
  };
}

export default function About({ profile }: AboutProps) {
  const metrics = [
    {
      label: 'Experience & Practice',
      value: profile.metrics?.yearsExperience || '3+ Years',
      icon: Award,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
    {
      label: 'Completed Projects',
      value: profile.metrics?.completedProjects || '24+',
      icon: Layers,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      label: 'Automated Test Cases',
      value: profile.metrics?.automatedTests || '1,200+',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Code Contributions',
      value: profile.metrics?.contributions || '450+',
      icon: Flame,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const highlights = [
    {
      title: 'Automation & Quality Assurance',
      desc: 'Expertise in building scalable end-to-end and regression suites using Playwright, Selenium, and Postman API automation.',
      icon: FileCheck,
    },
    {
      title: 'Full-Stack Modern Engineering',
      desc: 'Developing high-performance, SEO-optimized web applications with Next.js, React, Node.js, and MongoDB.',
      icon: Cpu,
    },
    {
      title: 'Cross-Functional Collaboration',
      desc: 'Collaborating closely with development, product, and QA teams using Jira, Git CI/CD, and agile sprint workflows.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>GET TO KNOW ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About <span className="text-gradient-primary">Me</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Bridging the gap between software development creativity and comprehensive test automation engineering.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                Background & Professional Philosophy
              </h3>

              <div className="text-slate-700 dark:text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {profile.aboutStory || profile.bio}
              </div>

              {/* Highlights 3-column pill */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-black/5 dark:border-white/5">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {metrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-5 sm:p-6 text-center space-y-3 glass-panel-hover"
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center shadow-inner`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
